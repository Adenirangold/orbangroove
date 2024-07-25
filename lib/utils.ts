import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().min(8).optional(),
  email: z.string().email().optional(),
  gender: z.string().optional(),
});

export const loginSchema = z.object({
  password: z.string().min(8),
  email: z.string().email(),
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
