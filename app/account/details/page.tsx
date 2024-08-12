import UpdateUserForm from "@/components/forms/UpdateUserForm";
import { getUser } from "@/actions/userAction";

import React from "react";

async function page() {
  const userData = await getUser();

  if (!userData) {
    console.log("Token expired");
    return;
  }

  const { _id, email, firstName, lastName, dateOfBirth, gender } = userData;

  const user = {
    id: _id?.toString(),
    email,
    firstName,
    lastName,
    dateOfBirth,
    gender,
  };

  return (
    <div className="mt-10 flex flex-col gap-10 justify-center items-center w-full h-full">
      <UpdateUserForm user={user}></UpdateUserForm>
    </div>
  );
}

export default page;
