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
