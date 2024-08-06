declare module "nodemailer-mailjet-transport" {
  import { TransportOptions } from "nodemailer";

  interface MailjetTransportOptions {
    auth: {
      apiKey: string;
      apiSecret: string;
    };
    options?: {
      url?: string;
      version?: string;
      perform_api_call?: boolean;
    };
  }

  function mailjetTransport(options: MailjetTransportOptions): TransportOptions;

  export = mailjetTransport;
}
