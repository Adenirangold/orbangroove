"use server";

import User from "@/models/user";
import { UserType } from "@/types";
import { connectToDb } from "@/utils/database";
import { compare, hashed } from "./utils";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

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
    });
    console.log(user);
  } catch (err) {
    console.log(err);
  }
};

export const login = async function ({ email, password }: UserType) {
  try {
    await connectToDb();
    const user = await User.findOne({ email: email });
    if (!user) {
      return { error: "Invalid credentials" };
    }
    const hashedPassword = user.password;
    const isPasswordMatched = await compare(password, hashedPassword);

    if (!isPasswordMatched) {
      return { error: "credentials server error" };
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
