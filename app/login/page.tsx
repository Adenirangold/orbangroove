import LoginForm from "@/components/forms/LoginForm";
import SignInButton from "@/components/SignInButton";
import React from "react";

function page() {
  return (
    <div className="mt-10 flex flex-col gap-10 justify-center items-center w-full h-full">
      <SignInButton></SignInButton>
      <LoginForm></LoginForm>
    </div>
  );
}

export default page;
