"use client";

import { ConfigProvider, Spin } from "antd";
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
    <ConfigProvider
      theme={{
        components: {
          Spin: {
            dotSizeLG: 100,
          },
        },
      }}
    >
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Spin
          tip="Wait a moment..."
          className="text-center text-red-50"
          size="large"
        >
          <p className="text-center">Welcome to TodChat</p>
        </Spin>
      </main>
    </ConfigProvider>
  );
}
