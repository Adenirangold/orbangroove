import { getAccount } from "@/actions/accountAction";
import { getUser } from "@/actions/userAction";
import Address from "@/components/Address";
import { AccountType } from "@/types";
import { redirect } from "next/navigation";

import React from "react";

async function page() {
  const { _id, firstName, lastName } = await getUser();
  const userAccount = await getAccount(_id?.toString());
  if (!userAccount) {
    redirect("/account/address/add");
  }
  const account: AccountType = {
    city: userAccount.city,
    address: userAccount.address,
    mobileNumber: userAccount.mobileNumber,
    postalCode: userAccount.postalCode,
    country: userAccount.country,
    lastName,
    firstName,
  };
  return (
    <div className="mt-10 flex flex-col gap-10 justify-center items-center w-full h-full">
      <Address account={account}></Address>
    </div>
  );
}

export default page;
