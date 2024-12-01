"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { ChromeIcon as Google } from "lucide-react";
import { loginUser } from "@/app/actions";
import { supabaseBrowser } from "@/supabase/browser";

export default function LoginButton() {
  async function handleLogin() {
    console.log("login");
    await loginUser();
    console.log("login done");
  }

  return (
    <Button onClick={handleLogin} className="w-full dark:text-white ">
      <Google className="mr-2 h-4 w-4" />
      Sign in with Google
    </Button>
  );
}
