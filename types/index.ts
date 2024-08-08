import { Types } from "mongoose";

export interface AccountType {
  userId?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  address?: string;
  mobileNumber?: string;
}

export interface UserType {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  id?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export interface SendEmailActionParams {
  to: string;
  subject: string;
  text: string;
  html: string;
}
