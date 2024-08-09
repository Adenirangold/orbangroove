"use client";
import { AccountType } from "@/types";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

function Address({ account }: { account: AccountType }) {
  const router = useRouter();
  const handleEdit = () => {
    router.push("/account/address/edit");
  };

  return (
    <div className="mb-10">
      <div className="flex flex-col gap-3 ">
        <span className="flex gap-2">
          <p>{account.firstName}</p>
          <p>{account.lastName}</p>
        </span>
        <p>{account.address}</p>
        <p>{account.city}</p>
        <p>{account.postalCode}</p>
        <p>{account.country}</p>
        <p>{account.mobileNumber}</p>
      </div>
      <div className=" mt-5 flex gap-3">
        <Button onClick={handleEdit} text="edit"></Button>
      </div>
    </div>
  );
}

export default Address;
