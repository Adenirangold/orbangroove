import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8),
  email: z.string().email(),
  gender: z.string(),
});

export async function hashed(data: any) {
  const salt = await bcrypt.genSalt(10);
  const hashedData = await bcrypt.hash(data, salt);
  return hashedData;
}
