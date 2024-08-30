"use client";
import "./globals.css";
import { AppWrapper } from "@/lib/context";
import Navigation from "@/components/Navigation";
import { usePathname } from "next/navigation";
import HomeNavigation from "@/components/HomeNavigation";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  console.log(pathname);
  const disableNav = ["/"];
  return (
    <html lang="en">
      <title>TodChat</title>
      <body>
        <AppWrapper>
          <Toaster richColors position="top-center" />
          <div>{children}</div>
          {disableNav.includes(pathname) && <HomeNavigation />}
          {!disableNav.includes(pathname) && <Navigation />}
        </AppWrapper>
      </body>
    </html>
  );
}
