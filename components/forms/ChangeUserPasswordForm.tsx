"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import CustomInput from "../CustomInput";
import { authFormSchema } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { changePassword } from "@/actions/userAction";

function ChangeUserPasswordForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    console.log(values);
    const { password, newPassword } = values;
    await changePassword({ password, newPassword });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomInput
            name="password"
            type="password"
            label="Current Password"
            control={form.control}
          ></CustomInput>
          <CustomInput
            name="newPassword"
            type="password"
            label="New Password"
            control={form.control}
          ></CustomInput>
          <CustomInput
            name="confirmNewPassword"
            type="password"
            label="Confirm New Password"
            control={form.control}
          ></CustomInput>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default ChangeUserPasswordForm;
