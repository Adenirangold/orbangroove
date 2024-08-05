import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
  })
  .refine((data) => (data.password ? data.password.length >= 8 : true), {
    message: "Password must be at least 8 characters long",
    path: ["password"],
  });

export async function hashed(data: any) {
  const salt = await bcrypt.genSalt(10);
  const hashedData = await bcrypt.hash(data, salt);
  return hashedData;
}
export async function compare(data: any, hashedData: any) {
  const match = await bcrypt.compare(data, hashedData);
  return match;
}

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload;
  } catch {
    return { error: "Invalid Token" };
  }
};
