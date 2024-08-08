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
import { createAccount } from "@/actions/accountAction";
import { UserType } from "@/types";
import mongoose, { Types } from "mongoose";

function AccountForm({ user }: { user: UserType }) {
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      mobileNumber: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    console.log(values);
    const { city, address, country, mobileNumber, postalCode } = values;
    try {
      await createAccount({
        userId: user.id,
        city,
        country,
        address,
        mobileNumber,
        postalCode,
      });
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

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default AccountForm;
