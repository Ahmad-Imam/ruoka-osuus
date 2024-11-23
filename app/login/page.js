import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChromeIcon as Google, VeganIcon } from "lucide-react";
import LoginCard from "./_components/LoginCard";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <LoginCard />
    </div>
  );
}
