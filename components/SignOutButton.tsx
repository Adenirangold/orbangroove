import { signOutAction } from "@/actions/userAction";
import React from "react";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        className="px-6 py-2 border border-yellow-200 font-bold"
        type="submit"
      >
        Sign Out
      </button>
    </form>
  );
}

export default SignOutButton;
