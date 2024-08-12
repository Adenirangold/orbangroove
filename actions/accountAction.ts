"use server";
import Account from "@/models/account";
import { AccountType, UserType } from "@/types";

import { connectToDb } from "@/utils/database";

export const createAccount = async ({
  city,
  address,
  country,
  mobileNumber,
  postalCode,
  userId,
}: AccountType) => {
  try {
    await connectToDb();
    await Account.create({
      city,
      address,
      country,
      mobileNumber,
      postalCode,
      userId,
    });
    return { success: true, message: "Account created successfully" };
  } catch (err) {
    console.error("Error creating account:", err);

    return { error: "An error occurred while creating the account" };
  }
};

export const updateAccount = async ({
  city,
  address,
  country,
  mobileNumber,
  postalCode,
  userId,
}: AccountType) => {
  try {
    if (!userId) {
      console.error("User ID is required to update account");
      return { error: "User ID is required" };
    }

    await connectToDb();
    await Account.updateOne(
      { userId: userId },
      { city, address, country, mobileNumber, postalCode }
    );

    console.log("Account updated successfully for user ID:", userId);

    return { success: true, message: "Account updated successfully" };
  } catch (err) {
    console.error("Error updating account:", err);

    return { error: "An error occurred while updating the account" };
  }
};

export const getAccount = async (userId: UserType) => {
  try {
    await connectToDb();
    const account = await Account.findOne({ userId: userId });
    if (!account) {
      console.error("Account not found for user ID");
      return { error: "Account not found" };
    }
    return account;
  } catch (err) {
    console.error("Error retrieving account:", err);

    return { error: "An error occurred while retrieving the account" };
  }
};
