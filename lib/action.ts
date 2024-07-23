"use server";
import { signIn, signOut } from "@/lib/auth";
import User from "@/models/user";
import { UserType } from "@/types";
import { connectToDb } from "@/utils/database";
import { hashed } from "./utils";

export const signInAction = async function () {
  await signIn("google");
};
export const signOutAction = async function () {
  await signOut({
    redirectTo: "/mon",
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
