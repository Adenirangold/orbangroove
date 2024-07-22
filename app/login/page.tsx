import SignInForm from "@/components/forms/SignInForm";
import SignInButton from "@/components/SignInButton";
import React from "react";

function page() {
  return (
    <div className="mt-10 flex flex-col gap-10 justify-center items-center w-full h-[100vh]">
      <SignInButton></SignInButton>
      <SignInForm></SignInForm>
    </div>
  );
}

export default page;
