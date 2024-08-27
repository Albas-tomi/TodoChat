"use client";
import React, { useState } from "react";
import Chat from "./Icons/Chat";
import Task from "./Icons/Task";
import { useAppContext } from "@/lib/context";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Navigation = () => {
  const pathname = usePathname();
  const path: any = pathname?.split("/")[1];
  return (
    <div className="fixed z-50 bottom-6 right-8 flex gap-4 ">
      <div className="flex">
        {path === "task" ? (
          <Link
            href="/chat"
            className="bg-[#F2F2F2] cursor-pointer z-10 w-[60px] h-[60px] flex justify-center items-center rounded-full shadow-sm"
          >
            <Chat props={{ width: "26.67px", color: "#8885FF" }} />
          </Link>
        ) : (
          <Link
            href="/task"
            className="bg-[#F2F2F2] cursor-pointer z-10 w-[60px] h-[60px] flex justify-center items-center rounded-full shadow-sm"
          >
            <Task props={{ width: "26.67px", color: "#F8B76B" }} />
          </Link>
        )}

        {/*     SHADOW */}
        <div className="bg-gray-500 w-[60px] h-[60px] flex justify-center items-center rounded-full absolute right-3 z-0 shadow-sm"></div>
        {/*     SHADOW */}
      </div>
      {path !== "task" ? (
        <div className="bg-[#8785FF] z-10 w-[60px] h-[60px] flex justify-center items-center rounded-full shadow-sm">
          <Chat props={{ width: "26.67px", color: "white" }} />
        </div>
      ) : (
        <div className="bg-[#F8B76B] z-10 w-[60px] h-[60px] flex justify-center items-center rounded-full shadow-sm">
          <Task props={{ width: "26.67px", color: "white" }} />
        </div>
      )}
    </div>
  );
};

export default Navigation;
