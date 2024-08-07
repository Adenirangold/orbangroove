import ChangeUserPasswordForm from "@/components/forms/ChangeUserPasswordForm";
import React from "react";

function page() {
  return (
    <div className="mt-10 flex flex-col gap-10 justify-center items-center w-full h-full">
      <ChangeUserPasswordForm></ChangeUserPasswordForm>
    </div>
  );
}

export default page;
