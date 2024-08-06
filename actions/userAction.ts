"use server";
import { hashed, verifyToken, compare } from "@/lib/utils";
import User from "@/models/user";
import { UserType } from "@/types";
import { connectToDb } from "@/utils/database";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

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
      { expiresIn: "1d" }
    );

    cookies().set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
      sameSite: "strict",
    });
    return { redirect: "/" };
  } catch (err) {
    return { error: "Internal server error" };
  }
};

export const signOutAction = async function () {
  cookies().delete("token");

  console.log("signed out");
};

export const getUser = async () => {
  try {
    const token = cookies().get("token")?.value;
    await connectToDb();
    const payload = await verifyToken(token!);
    const user = await User.findById(payload.userId);

    if (!user) {
      return { error: "Invalid Token" };
    }
    return user;
  } catch (err) {
    console.log("No User Found");
    return { error: "Invalid Token" };
  }
};

export async function updateUser({
  lastName,
  firstName,
  email,
  gender,
  dateOfBirth,
  id,
}: UserType) {
  try {
    await connectToDb();
    const result = await User.updateOne(
      { _id: id },
      {
        lastName,
        firstName,
        email,

        gender,
        dateOfBirth,
      }
    );
    return result;
  } catch (error) {
    console.log(error);

    return { error: "Invalid credentials" };
  }
}
