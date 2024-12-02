"use client";
import React from "react";

import { Button } from "@/components/ui/button";

import { ChromeIcon as Google } from "lucide-react";
import { loginUser } from "@/app/actions";

export default function LoginButton() {
  async function handleLogin() {
    await loginUser();
  }

  return (
    <Button onClick={handleLogin} className="w-full dark:text-white ">
      <Google className="mr-2 h-4 w-4" />
      Sign in with Google
    </Button>
  );
}
