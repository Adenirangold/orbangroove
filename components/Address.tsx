import React from "react";

function Address() {
  return (
    <div className="mb-10">
      <div className="flex flex-col gap-3 ">
        <p>Adeniran gold</p>
        <p>taoheed road</p>
        <p>ilorin</p>
        <p>240027</p>
        <p>Nigeria</p>
      </div>
      <div className=" mt-5 flex gap-3">
        <button className="border border-black px-3">edit</button>
        <button className="border border-black px-3">delete</button>
      </div>
    </div>
  );
}

export default Address;
