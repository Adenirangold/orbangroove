import { getAccount } from "@/actions/accountAction";
import { getUser } from "@/actions/userAction";
import Address from "@/components/Address";
import AccountForm from "@/components/forms/AccountForm";
import { AccountType, UserType } from "@/types";

import React from "react";

async function page() {
  const { _id, firstName, lastName } = await getUser();
  const userId = _id?.toString();
  const userAccount = await getAccount(userId);
  const { city, postalCode, address, mobileNumber, country } = userAccount;

  const account: AccountType = {
    city,
    postalCode,
    address,
    mobileNumber,
    country,
  };

  const signedUser: UserType = {
    firstName,
    lastName,
    id: userId,
  };

  return (
    <div className="mt-10 flex flex-col gap-10 justify-center items-center w-full h-full">
      <AccountForm account={account} user={signedUser}></AccountForm>
    </div>
  );
}

export default page;
