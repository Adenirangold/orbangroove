import UpdateUserForm from "@/components/forms/UpdateUserForm";
import { getUser } from "@/lib/action";
import React from "react";

async function page() {
  const data = await getUser();

  const user = {
    id: data._id?.toString(),
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
  };
  console.log(user);

  return (
    <div className="mt-10 flex flex-col gap-10 justify-center items-center w-full h-full">
      <UpdateUserForm user={user}></UpdateUserForm>
    </div>
  );
}

export default page;
