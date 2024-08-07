"use server";
import { hashed, verifyToken, compare } from "@/lib/utils";
import User from "@/models/user";
import { UserType } from "@/types";
import { connectToDb } from "@/utils/database";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { sendEmailAction } from "./sendEmailAction";

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

export async function changePassword({ password, newPassword }: UserType) {
  try {
    const signedUser = await getUser();
    if (!signedUser) {
      console.log("user not logged in");
      return { error: "User Not Logged In" };
    }
    const user = await User.findOne({ email: signedUser.email }).select(
      "password"
    );
    if (!user) {
      console.log("user does not exist");
      return { error: "User does not exist" };
    }
    const passwordMatch = await compare(password, user?.password);
    if (!passwordMatch) {
      console.log("current password is not correct");
      return { error: "current password is not correct" };
    }
    const hashedPassword = await hashed(newPassword);
    await User.findOneAndUpdate(
      { email: signedUser.email },
      { password: hashedPassword }
    );
  } catch (error) {
    console.log("error in changing password");
  }
}
