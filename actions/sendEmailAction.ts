import { SendEmailActionParams } from "@/types";
import { sendEmail } from "@/utils/email";

export async function sendEmailAction({
  to,
  subject,
  text,
  html,
}: SendEmailActionParams) {
  try {
    await sendEmail({ to, subject, text, html });
    console.log("email sent sucessfully");
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Error sending email" };
  }
}
