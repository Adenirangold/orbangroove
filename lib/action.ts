"use server";

import User from "@/models/user";
import { UserType } from "@/types";
import { connectToDb } from "@/utils/database";
import { compare, hashed, verifyToken } from "./utils";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { log } from "console";
import { jwtVerify } from "jose";

export const signOutAction = async function () {
  cookies().set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "strict",
  });

  console.log("signed out");
};

export const createUser = async function ({
  lastName,
  firstName,
  email,
  password,
  gender,
  dateOfBirth,
}: UserType) {
  try {
    await connectToDb();
    const hashedPassword = await hashed(password);
    const user = await User.create({
      lastName,
      firstName,
      email,
      gender,
      password: hashedPassword,
      dateOfBirth,
    });

    return { redirect: "/login" };
  } catch (err) {
    console.log(err);
    return { error: "Internal server error" };
  }
};

export const login = async function ({ email, password }: UserType) {
  try {
    await connectToDb();
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return { error: "Invalid credentials" };
    }
    const hashedPassword = user.password;
    const isPasswordMatched = await compare(password, hashedPassword);

    if (!isPasswordMatched) {
      return { error: "Invalid credentials" };
    }
    const token = sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    cookies().set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 3600,
      sameSite: "strict",
    });
    return { redirect: "/" };
  } catch (err) {
    return { error: "Internal server error" };
  }
};

export const resetPassword = async (email: UserType) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    return {
      error:
        "The user with this email address does not exist. Try signing up with this email",
    };
  }
};

export const getUser = async () => {
  const token = cookies().get("token")?.value;
  await connectToDb();
  const payload = await verifyToken(token!);
  const user = await User.findById(payload.userId);
  // console.log(user);

  if (!user) {
    return { error: "Invalid Token" };
  }
  return user;
};
