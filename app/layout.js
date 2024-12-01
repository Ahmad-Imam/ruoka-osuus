import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Ruoka Osuus",
  description: "Food sharing platform",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-center" duration="1500" richColors />
          <Navbar />
          <div className="flex min-h-screen flex-col ">
            <main className="flex-1">{children}</main>
            <footer className="border-t ">
              <div className="flex h-14 items-center justify-center ">
                <p className="text-sm text-muted-foreground">
                  © 2024 RuokaOsuus. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
