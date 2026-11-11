interface ContactNotificationProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  messageId: string;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

export function contactNotificationEmail(
  data: ContactNotificationProps
) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const subject = escapeHtml(data.subject);
  const message = escapeHtml(data.message).replace(
    /\n/g,
    "<br>"
  );

  return {
    subject: `New Portfolio Message: ${data.subject}`,

    text: `
New portfolio contact message

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

Message ID: ${data.messageId}
    `,

    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;background:#f4f7fb;font-family:Arial,sans-serif;padding:30px 12px;">
  <div style="max-width:600px;margin:auto;background:white;border-radius:12px;overflow:hidden;">

    <div style="background:#1686bb;padding:28px;color:white;">
      <h2 style="margin:0;">New Portfolio Message</h2>
      <p style="margin:8px 0 0;">You have received a new message.</p>
    </div>

    <div style="padding:30px;">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:25px 0;"/>

      <h3>Message</h3>

      <div style="background:#f8fafc;padding:18px;border-radius:8px;line-height:1.7;">
        ${message}
      </div>

      <p style="font-size:12px;color:#64748b;margin-top:25px;">
        Message ID: ${data.messageId}
      </p>
    </div>

    <div style="padding:20px;text-align:center;background:#f8fafc;color:#64748b;font-size:12px;">
      The Portfolio | Norm Soklim
    </div>

  </div>
</body>
</html>
    `,
  };
}
