import { getUser } from "@/actions/userAction";
import AccountForm from "@/components/forms/AccountForm";
import { UserType } from "@/types";

import React from "react";

async function page() {
  const { _id, firstName, lastName } = await getUser();

  const signedUser: UserType = {
    firstName,
    lastName,
    id: _id?.toString(),
  };

  return (
    <div className="mt-10 flex flex-col gap-10 justify-center items-center w-full h-full">
      <AccountForm user={signedUser}></AccountForm>
    </div>
  );
}

export default page;
