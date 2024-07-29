import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().min(8).optional(),
  email: z.string().email().optional(),
  gender: z.string().optional(),
  date: z.string().optional(),
  months: z.string().optional(),
  year: z.string().optional(),
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
