"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import CustomInput from "../CustomInput";
import { authFormSchema } from "@/lib/utils";
import { createUser } from "@/lib/action";
import { useRouter } from "next/navigation";
import CustomSelect from "../CustomSelect";
import { daysArray, monthsArray, yearsArray } from "@/constant";

function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
      gender: "",
      lastName: "",
      firstName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    console.log(values);
    const { firstName, gender, email, password, lastName, date, months, year } =
      values;

    const dateCombined = `${date}|${months}|${year}`;
    console.log(dateCombined);

    const result = await createUser({
      email,
      password,
      firstName,
      gender,
      lastName,
      dateOfBirth: dateCombined,
    });

    if (result?.redirect) {
      router.push("/");
    }
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
            type="text"
            name="firstName"
            label="First Name"
            control={form.control}
          ></CustomInput>
          <CustomInput
            type="text"
            name="lastName"
            label="Last Name"
            control={form.control}
          ></CustomInput>
          <CustomInput
            type="password"
            name="password"
            label="Password"
            description="Must be 8 or more characters"
            control={form.control}
          ></CustomInput>

          <div className="flex gap-4">
            <CustomSelect
              control={form.control}
              placeholder="DD"
              name="date"
              items={daysArray}
            ></CustomSelect>
            <CustomSelect
              control={form.control}
              placeholder="Months"
              name="months"
              items={monthsArray}
            ></CustomSelect>
            <CustomSelect
              control={form.control}
              placeholder="YYYY"
              name="year"
              items={yearsArray}
            ></CustomSelect>
          </div>

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Mostly Interested In</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row items-center gap-10  space-y-1"
                  >
                    <div>
                      <FormItem className="flex  items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Menswear</FormLabel>
                      </FormItem>
                    </div>
                    <div>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Womenswear
                        </FormLabel>
                      </FormItem>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default SignInForm;
