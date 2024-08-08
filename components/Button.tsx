"use client";
import React from "react";

function Button({ onClick, text }: { onClick: () => void; text: string }) {
  return (
    <div className=" mt-5 flex gap-3">
      <button onClick={onClick} className="border border-black px-3">
        {text}
      </button>
    </div>
  );
}

export default Button;
