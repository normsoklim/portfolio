import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import { getMailer, getSender } from "@/src/lib/mailer";
import { checkContactRateLimit } from "@/src/lib/rate-limit";
import { contactSchema } from "@/src/lib/validations/contact";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function getClientIp(request: Request) {
  const realIp = request.headers.get("x-real-ip");

  if (realIp) return realIp;

  const forwardedFor = request.headers.get("x-forwarded-for");

  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  try {
    // 0. Check required environment variables
    const requiredEnv = {
      MAIL_HOST: process.env.MAIL_HOST,
      MAIL_USERNAME: process.env.MAIL_USERNAME,
      MAIL_PASSWORD: process.env.MAIL_PASSWORD,
      MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
      MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,
      CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
      SITE_URL: process.env.SITE_URL,
    };

    const missing = Object.entries(requiredEnv)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missing.length > 0) {
      console.error("Missing environment variables:", missing);

      return NextResponse.json(
        {
          success: false,
          message: `Server configuration error: missing ${missing.join(", ")}.`,
        },
        { status: 500 }
      );
    }

    // 1. Verify request origin
    const siteUrl = process.env.SITE_URL!;

    const origin = request.headers.get("origin");

    if (!origin || new URL(origin).origin !== new URL(siteUrl).origin) {
      return NextResponse.json(
        { success: false, message: "Invalid request origin." },
        { status: 403 }
      );
    }

    // 2. Check content length
    const contentLength = Number(
      request.headers.get("content-length") || 0
    );

    if (contentLength > 12000) {
      return NextResponse.json(
        { success: false, message: "Request is too large." },
        { status: 413 }
      );
    }

    // 3. Rate limit
    const ip = getClientIp(request);
    const rateLimit = await checkContactRateLimit(ip);

    if (rateLimit.configurationError) {
      return NextResponse.json(
        { success: false, message: "Service temporarily unavailable." },
        { status: 503 }
      );
    }

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many messages. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "600",
          },
        }
      );
    }

    // 4. Parse request body
    const body = await request.json();

    // 5. Validate input
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check your information.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message, website } =
      validation.data;

    // 6. Honeypot: silently accept bot submissions
    if (website) {
      return NextResponse.json({
        success: true,
        message: "Message submitted successfully.",
      });
    }

    // 7. Check email configuration
    const recipient = process.env.CONTACT_TO_EMAIL;

    if (!recipient) {
      console.error("Missing email configuration.");

      return NextResponse.json(
        { success: false, message: "Email service is unavailable." },
        { status: 503 }
      );
    }

    const mailer = getMailer();
    const sender = getSender();

    // 8. Escape user input before inserting it into HTML
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    // 9. Send notification to your Gmail via SMTP
    try {
      await mailer.sendMail({
        from: `"${sender.name}" <${sender.address}>`,
        to: recipient,
        replyTo: email,
        subject: `Portfolio Contact: ${subject}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Subject: ${subject}`,
          "",
          message,
        ].join("\n"),
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.7;">
            <h2>New Portfolio Message</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <hr />
            <h3>Message</h3>
            <p>${safeMessage}</p>
          </div>
        `,
      });
    } catch (error) {
      console.error("Contact notification failed:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to send your message. Please try again.",
        },
        { status: 502 }
      );
    }

    // 10. Send confirmation email to visitor
    try {
      await mailer.sendMail({
        from: `"${sender.name}" <${sender.address}>`,
        to: email,
        subject: "Thanks for contacting Norm Soklim!",
        text: `
Hi ${name},

Thank you for reaching out!

I've received your message and appreciate your interest.
I'll review it and get back to you as soon as possible.

Best regards,
Norm Soklim
Full-Stack Developer
      `,
        html: `
          <div style="
            font-family: Arial, sans-serif;
            line-height: 1.7;
            max-width: 600px;
            margin: auto;
            padding: 24px;
            color: #263445;
          ">
            <h2>Thank you for contacting me!</h2>

            <p>Hi ${safeName},</p>

            <p>
              Thank you for reaching out through my portfolio.
              I've successfully received your message.
            </p>

            <p>
              I'll review your message and get back to you
              as soon as possible.
            </p>

            <hr />

            <p><strong>Your subject:</strong> ${safeSubject}</p>

            <p style="margin-top: 28px;">
              Best regards,<br />
              <strong>Norm Soklim</strong><br />
              Full-Stack Developer
            </p>
          </div>
        `,
      });
    } catch (error) {
      console.error("Visitor confirmation failed:", error);

      // The owner's notification was already sent.
      return NextResponse.json({
        success: true,
        confirmationSent: false,
        message:
          "Your message was received, but the confirmation email could not be sent.",
      });
    }

    // 11. Success
    return NextResponse.json({
      success: true,
      confirmationSent: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
