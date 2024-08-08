import { getAccount } from "@/actions/accountAction";
import { getUser } from "@/actions/userAction";
import AccountForm from "@/components/forms/AccountForm";
import { AccountType, UserType } from "@/types";
import { useRouter } from "next/navigation";

import React from "react";

async function page() {
  const { _id, firstName, lastName } = await getUser();
  const userId = _id?.toString();

  const signedUser: UserType = {
    firstName,
    lastName,
    id: userId,
  };

  return (
    <div className="mt-10 flex flex-col gap-10 justify-center items-center w-full h-full">
      <AccountForm user={signedUser}></AccountForm>
    </div>
  );
}

export default page;
