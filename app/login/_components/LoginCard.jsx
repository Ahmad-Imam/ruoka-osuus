import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { VeganIcon } from "lucide-react";
import LoginButton from "./LoginButton";

export default function LoginCard() {
  return (
    <Card className="w-full max-w-md cardFull cardFullDark ">
      <CardHeader className="flex flex-col items-center space-y-2">
        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
          <VeganIcon className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-center">Welcome to FoodShare</h1>
        <p className="text-muted-foreground text-center">
          Connect, share, and reduce food waste in your community
        </p>
      </CardHeader>
      <CardContent>
        <LoginButton />
      </CardContent>
    </Card>
  );
}
