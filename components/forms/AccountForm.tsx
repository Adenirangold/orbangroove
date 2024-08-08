"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import CustomInput from "../CustomInput";
import { authFormSchema } from "@/lib/utils";

import CustomSelect from "../CustomSelect";
import { countryName } from "@/constant/countries";
import { createAccount, updateAccount } from "@/actions/accountAction";
import { AccountType, UserType } from "@/types";
import { useRouter } from "next/navigation";

function AccountForm({
  user,
  account,
}: {
  user: UserType;
  account?: AccountType;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      mobileNumber: account ? account.mobileNumber : "",
      address: account ? account.address : "",
      city: account ? account.city : "",
      postalCode: account ? account.postalCode : "",
      country: account ? account.country : "",
    },
  });

  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    console.log(values);
    const { city, address, country, mobileNumber, postalCode } = values;
    try {
      if (account) {
        await updateAccount({
          userId: user?.id,
          city,
          country,
          address,
          mobileNumber,
          postalCode,
        });
      } else {
        await createAccount({
          userId: user?.id,
          city,
          country,
          address,
          mobileNumber,
          postalCode,
        });
      }
      router.push("/account/address");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomInput
            name="firstName"
            disabled
            type="text"
            label="First Name"
            control={form.control}
          ></CustomInput>
          <CustomInput
            disabled
            name="lastName"
            type="text"
            label="Last Name"
            control={form.control}
          ></CustomInput>
          <CustomInput
            name="mobileNumber"
            type="number"
            label="Mobile"
            control={form.control}
          ></CustomInput>
          <CustomSelect
            control={form.control}
            placeholder="Please select"
            name="country"
            label="Country"
            items={countryName}
          ></CustomSelect>
          <CustomInput
            name="address"
            type="text"
            label="Address"
            control={form.control}
          ></CustomInput>
          <CustomInput
            name="city"
            type="text"
            label="City"
            control={form.control}
          ></CustomInput>
          <CustomInput
            name="postalCode"
            type="text"
            label="PostCode"
            control={form.control}
          ></CustomInput>

          <Button type="submit">{account ? "edit" : "add"}</Button>
        </form>
      </Form>
    </div>
  );
}

export default AccountForm;
