import React from "react";
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
import { authFormSchema } from "@/lib/utils";

interface SelectInput {
  control: Control<z.infer<typeof authFormSchema>>;
  name: FieldPath<z.infer<typeof authFormSchema>>;
  items?: string[];
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
                <SelectItem key={i} value={item}>
                  {item}
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

// import React, { useEffect } from "react";
// import { Control, FieldPath, useController } from "react-hook-form";
// import * as z from "zod";

// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { authFormSchema } from "@/lib/utils";

// interface SelectInput {
//   control: Control<z.infer<typeof authFormSchema>>;
//   name: FieldPath<z.infer<typeof authFormSchema>>;
//   items?: string[];
//   placeholder?: string;
//   defaultVal?: string;
// }

// function CustomSelect({
//   control,
//   items,
//   name,
//   placeholder,
//   defaultVal,
// }: SelectInput) {
//   const { field } = useController({
//     name,
//     control,
//     defaultValue: defaultVal || "",
//   });

//   useEffect(() => {
//     if (defaultVal && !field.value) {
//       field.onChange(defaultVal);
//     }
//   }, [defaultVal, field]);

//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={() => (
//         <FormItem>
//           <Select onValueChange={field.onChange} value={field.value}>
//             <FormControl>
//               <SelectTrigger>
//                 <SelectValue placeholder={placeholder} />
//               </SelectTrigger>
//             </FormControl>
//             <SelectContent>
//               {items?.map((item: string, i: number) => (
//                 <SelectItem key={i} value={item}>
//                   {item}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }

// export default CustomSelect;
