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
  } catch (err) {
    console.log(err);
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
    await connectToDb();
    await Account.updateOne(
      { userId: userId },
      { city, address, country, mobileNumber, postalCode }
    );
  } catch (err) {}
};

export const getAccount = async (userId: UserType) => {
  try {
    await connectToDb();
    const account = await Account.findOne({ userId: userId });
    return account;
  } catch (err) {
    console.log("Gettin account imposible");
  }
};
