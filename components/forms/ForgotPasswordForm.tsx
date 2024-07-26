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

function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    console.log(values);
    const { email } = values;
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomInput
            name="email"
            type="email"
            label="Email Address"
            control={form.control}
          ></CustomInput>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default ForgotPasswordForm;
