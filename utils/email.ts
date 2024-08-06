import nodemailer from "nodemailer";
import mailjetTransport from "nodemailer-mailjet-transport";

const transporter = nodemailer.createTransport(
  mailjetTransport({
    auth: {
      apiKey: process.env.MAILJET_API_KEY!,
      apiSecret: process.env.MAILJET_SECRET_KEY!,
    },
  })
);

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: EmailOptions): Promise<void> {
  const mailOptions: nodemailer.SendMailOptions = {
    from: "Your Name <your-verified-sender-email@example.com>",
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
