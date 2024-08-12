import { getUser } from "@/actions/userAction";
import AccountForm from "@/components/forms/AccountForm";
import { UserType } from "@/types";
import { redirect } from "next/navigation";

import React from "react";

async function page() {
  const userData = await getUser();
  const { _id, firstName, lastName } = userData;
  if (userData.error) {
    console.error("Error fetching user:", userData.error);
    redirect("/");
  }

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
