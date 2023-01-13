import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px",
        background: "yellow",
      }}
    >
      <Link href={"/"}>Home</Link>
      <Link href={"/login"}>login</Link>
      <Link href={"/signup"}>signup</Link>
    </div>
  );
}
