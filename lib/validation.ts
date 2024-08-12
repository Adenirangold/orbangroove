import { z } from "zod";
export const authFormSchema = z
  .object({
    email: z.string().email("Please enter a valid email address").optional(),
    firstName: z.string().min(1, "First name is required").optional(),
    lastName: z.string().min(1, "Last name is required").optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .optional(),
    gender: z.string().optional(),
    date: z.string().min(1, "Please select a day").optional(),
    months: z.string().min(1, "Please select a month").optional(),
    year: z.string().min(1, "Please select a year").optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmNewPassword: z.string().optional(),
    address: z.string().min(1, "Address is required").optional(),
    country: z.string().min(1, "Country is required").optional(),
    postalCode: z
      .string()
      .regex(
        /^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] \d[A-Z]\d|[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}|\d{4,6}|\d{3}-\d{4})$/,
        "Invalid postal code format"
      )
      .optional(),
    city: z.string().min(1, "City is required").optional(),
    mobileNumber: z
      .string()
      .regex(/^\d{10,15}$/, "Mobile number must be between 10 and 15 digits")
      .optional(),
  })
  .refine((data) => (data.password ? data.password.length >= 8 : true), {
    message: "Password must be at least 8 characters long",
    path: ["password"],
  })
  .refine(
    (data) => {
      if (data.newPassword && data.confirmNewPassword) {
        return data.newPassword === data.confirmNewPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmNewPassword"],
    }
  );
