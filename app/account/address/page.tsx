import { getAccount } from "@/actions/accountAction";
import { getUser } from "@/actions/userAction";
import Address from "@/components/Address";
import { AccountType } from "@/types";
import { redirect } from "next/navigation";

import React from "react";

async function page() {
  const userData = await getUser();
  const { _id, firstName, lastName } = userData;

  if (userData.error) {
    console.error("Error fetching user:", userData.error);
  }

  if (!_id) {
    console.error("User ID is missing");
  }

  const userAccount = await getAccount(_id?.toString());
  if (userAccount.error) {
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
