import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { Control, FieldPath } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/validation";

interface CustomInput {
  control: Control<z.infer<typeof authFormSchema>>;
  name: FieldPath<z.infer<typeof authFormSchema>>;
  type?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
}

function CustomInput({
  control,
  name,
  label,
  type,
  description,
  disabled,
}: CustomInput) {
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} {...field} />
          </FormControl>
          <FormDescription>{description}</FormDescription>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomInput;
