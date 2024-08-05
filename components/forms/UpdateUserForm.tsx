"use client";
import React, { useEffect } from "react";
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
import { updateUser } from "@/lib/action";
import { useRouter } from "next/navigation";
import CustomSelect from "../CustomSelect";
import { daysArray, monthsArray, yearsArray } from "@/constant";

interface UserProp {
  id: string | undefined;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
}

function UpdateUserForm({ user }: { user: UserProp }) {
  const router = useRouter();

  const { email, gender, lastName, firstName, dateOfBirth, id } = user;

  const [date, months, year] = dateOfBirth?.split("|") || [];

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: email,
      gender: gender,
      lastName: lastName,
      firstName: firstName,
      date: date,
      months: months,
      year: year,
    },
  });

  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    console.log(values);
    const { firstName, gender, email, lastName, date, months, year } = values;

    const dateCombined = `${date}|${months}|${year}`;

    try {
      await updateUser({
        firstName,
        lastName,
        gender,
        email,
        dateOfBirth: dateCombined,
        id,
      });
      console.log("updated already");
    } catch {
      console.log("Unable to Update User");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomInput
            disabled
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

          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
    </div>
  );
}

export default UpdateUserForm;
