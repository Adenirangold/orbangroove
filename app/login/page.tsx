import LoginForm from "@/components/forms/LoginForm";
import SignOutButton from "@/components/SignOutButton";
import React from "react";

function page() {
  return (
    <div className="mt-10 flex flex-col gap-10 justify-center items-center w-full h-full">
      <SignOutButton></SignOutButton>

      <LoginForm></LoginForm>
    </div>
  );
}

export default page;
