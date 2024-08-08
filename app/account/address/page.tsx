import Address from "@/components/Address";
import React from "react";

async function page() {
  return (
    <div className="mt-10 flex flex-col gap-10 justify-center items-center w-full h-full">
      <Address></Address>
    </div>
  );
}

export default page;
