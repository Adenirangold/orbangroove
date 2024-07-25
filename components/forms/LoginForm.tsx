"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import CustomInput from "../CustomInput";
import { authFormSchema } from "@/lib/utils";
import { login } from "@/lib/action";

function LoginForm() {
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    console.log(values);
    const { email, password } = values;
    await login({ email, password });
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

          <CustomInput
            type="password"
            name="password"
            label="Password"
            control={form.control}
          ></CustomInput>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
