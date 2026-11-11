import nodemailer from "nodemailer";

const requiredVariables = [
  "MAIL_HOST",
  "MAIL_USERNAME",
  "MAIL_PASSWORD",
  "MAIL_FROM_ADDRESS",
  "MAIL_FROM_NAME",
];

function getTransporter() {
  for (const key of requiredVariables) {
    if (!process.env[key]) {
      throw new Error(`${key} is not configured`);
    }
  }

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT || 587),

    secure:
      Number(process.env.MAIL_PORT || 587) === 465,

    requireTLS: true,

    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
}

let transporter: ReturnType<typeof nodemailer.createTransport> | null =
  null;

export function getMailer() {
  if (!transporter) {
    transporter = getTransporter();
  }

  return transporter;
}

export function getSender() {
  return {
    name: process.env.MAIL_FROM_NAME!,
    address: process.env.MAIL_FROM_ADDRESS!,
  };
}
