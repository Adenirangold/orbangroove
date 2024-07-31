import SignUpForm from "@/components/forms/SignUpForm";
import SignOutButton from "@/components/SignOutButton";
import { getUser } from "@/lib/action";
import React from "react";

async function page() {
  const { email, firstName, lastName, gender, dateOfBirth } = await getUser();
  const userData = {
    email,
    firstName,
    lastName,
    gender,
    dateOfBirth,
  };

  return (
    <div className="mt-10 flex flex-col gap-10 justify-center items-center w-full h-full">
      <SignOutButton></SignOutButton>
      <SignUpForm data={userData} type="update"></SignUpForm>
    </div>
  );
}

export default page;
