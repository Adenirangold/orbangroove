"use server";
import { signIn, signOut } from "@/lib/auth";

export const signInAction = async function () {
  await signIn("google");
};
export const signOutAction = async function () {
  await signOut({
    redirectTo: "/mon",
  });
  console.log("signed out");
};
