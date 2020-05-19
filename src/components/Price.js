import React from "react";

export default function Price({ children }) {
  return (
    <>
      DKK{" "}
      {children.toLocaleString("da-DK", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </>
  );
}
