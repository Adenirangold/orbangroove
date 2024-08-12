"use server";
import { hashed, verifyToken, compare } from "@/lib/utils";
import User from "@/models/user";
import { UserType } from "@/types";
import { connectToDb } from "@/utils/database";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { sendEmailAction } from "./sendEmailAction";
import { revalidatePath } from "next/cache";

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
    console.error("Error creating user:", err);

    return { error: "An error occurred while creating the user." };
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
    console.error("Error during login:", err);

    return { error: "An error occurred during login." };
  }
};

export const signOutAction = async function () {
  try {
    cookies().delete("token");

    console.log("User has been signed out successfully.");
  } catch (err) {
    console.error("Error during sign-out:", err);
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
    if (!id) {
      return { error: "User ID is required" };
    }
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
    revalidatePath("/account/address");
    return result;
  } catch (error) {
    console.log(error);

    console.error("Error updating user:", error);

    return { error: "An error occurred while updating the user." };
  }
}
export const getUser = async () => {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      console.error("Token not found");
      return { error: "Token not provided" };
    }
    await connectToDb();
    const payload = await verifyToken(token!);
    const user = await User.findById(payload.userId);

    if (!user) {
      console.error("User not found for the provided token");
      return { error: "Invalid token" };
    }
    return user;
  } catch (err) {
    console.error("Error retrieving user:", err);

    return { error: "Invalid token or internal error" };
  }
};

export async function changePassword({ password, newPassword }: UserType) {
  try {
    const signedUser = await getUser();
    if (!signedUser) {
      console.error("User not logged in");
      return { error: "User not logged in" };
    }
    const user = await User.findOne({ email: signedUser.email }).select(
      "password"
    );
    if (!user) {
      console.error("User does not exist");
      return { error: "Invalid Credential" };
    }
    const passwordMatch = await compare(password, user?.password);
    if (!passwordMatch) {
      console.error("Current password is not correct");
      return { error: "Current password is not correct" };
    }
    const hashedPassword = await hashed(newPassword);
    await User.findOneAndUpdate(
      { email: signedUser.email },
      { password: hashedPassword }
    );
    console.log("Password changed successfully");
    return { success: "Password changed successfully" };
  } catch (error) {
    console.error("Error changing password:", error);
    return { error: "An error occurred while changing the password" };
  }
}
