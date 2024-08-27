"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/task");
    }, 1000);
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <span className="loading loading-ring w-28"></span>
    </main>
  );
}
