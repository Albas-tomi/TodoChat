"use client";
import React, { useState } from "react";
import Chat from "./Icons/Chat";
import Task from "./Icons/Task";
import { useAppContext } from "@/lib/context";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Lighting from "./Icons/Lighting";

const HomeNavigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  console.log(showMenu);
  return (
    <div className="fixed z-50 bottom-6 right-8 flex gap-4 ">
      <div className="flex gap-3">
        <div
          className={` gap-3 transition-opacity  duration-100 transform ${
            showMenu ? "opacity-100 flex" : "opacity-0 hidden"
          }`}
        >
          <Link
            href="/task"
            className="bg-[#F2F2F2] relative cursor-pointer z-10 w-[60px] h-[60px] flex justify-center items-center rounded-full shadow-sm"
          >
            <p className="absolute -top-7  text-[#F2F2F2] text-center">Task</p>
            <Task props={{ width: "26.67px", color: "#F8B76B" }} />
          </Link>
          <Link
            href="/chat"
            className="bg-[#F2F2F2] relative cursor-pointer z-10 w-[60px] h-[60px] flex justify-center items-center rounded-full shadow-sm"
          >
            <p className="absolute -top-7  text-[#F2F2F2] text-center">Inbox</p>
            <Chat props={{ width: "26.67px", color: "#8885FF" }} />
          </Link>
        </div>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="bg-[#2F80ED] cursor-pointer z-10 w-[60px] h-[60px] flex justify-center items-center rounded-full shadow-sm"
        >
          <Lighting props={{ width: "18px", height: "32px", color: "white" }} />
        </button>
      </div>
    </div>
  );
};

export default HomeNavigation;
