// import nodemailer from "nodemailer";
// import mailjetTransport from "nodemailer-mailjet-transport";

// const transporter = nodemailer.createTransport(
//   mailjetTransport({
//     auth: {
//       apiKey: process.env.MAILJET_API_KEY!,
//       apiSecret: process.env.MAILJET_SECRET_KEY!,
//     },
//   })
// );

// interface EmailOptions {
//   to: string;
//   subject: string;
//   text: string;
//   html: string;
// }

// export async function sendEmail({
//   to,
//   subject,
//   text,
//   html,
// }: EmailOptions): Promise<void> {
//   const mailOptions: nodemailer.SendMailOptions = {
//     from: "OrbanGrove <adeniranbayogold@gmail.com>",
//     to,
//     subject,
//     text,
//     html,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully");
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// }

import Mailjet from "node-mailjet";

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY!,
  apiSecret: process.env.MAILJET_SECRET_KEY!,
});

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
  try {
    const result = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "adeniranbayogold@gmail.com",
            Name: "Orbangroove",
          },
          To: [
            {
              Email: to,
            },
          ],
          Subject: subject,
          TextPart: text,
          HTMLPart: html,
        },
      ],
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
