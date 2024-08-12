import React, { useState } from "react";
import { Control, FieldPath } from "react-hook-form";
import * as z from "zod";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authFormSchema } from "@/lib/validation";
import Image from "next/image";

interface SelectInput {
  control: Control<z.infer<typeof authFormSchema>>;
  name: FieldPath<z.infer<typeof authFormSchema>>;
  items?: any;
  placeholder?: string;
  defaultVal?: string;
  label?: string;
}
function CustomSelect({
  control,
  items,
  name,
  placeholder,
  defaultVal,
  label,
}: SelectInput) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <Select
            onValueChange={field.onChange}
            defaultValue={defaultVal ? defaultVal : field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items?.map((item: any, i: number) => (
                <SelectItem key={i} value={item.name}>
                  <div className="flex items-center">
                    <Image
                      width={20}
                      height={20}
                      src={item.flag}
                      alt={`${item.name} flag`}
                      className="w-6 h-4 mr-2 "
                    />
                    <span>{item.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomSelect;
