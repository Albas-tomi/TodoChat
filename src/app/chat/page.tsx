"use client";
import { chatServices } from "@/services/chat";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

const ChatPage = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState<string>("");
  const [chats, setChats] = useState<any>([]);
  const getAllChatsData = async () => {
    setIsLoading("");
    try {
      setIsLoading("getData");
      const { data } = await chatServices.getAllChats();
      setChats(data);
      setIsLoading("");
    } catch (error) {
      console.log(error);
      setIsLoading("");
    }
  };

  useEffect(() => {
    getAllChatsData();
  }, []);

  return (
    <div>
      <div className="px-8 relative my-3">
        <input
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="border h-[32px] border-[#828282] px-14 w-full  rounded-md"
        />
        <IoIosSearch
          className={`${search !== "" && "hidden"} absolute top-2 right-24`}
        />
      </div>

      {/* Content */}
      {isLoading === "getData" ? (
        <div className="text-center h-[80vh]   w-full flex flex-col justify-center items-center">
          <span className="loading loading-spinner  w-[60px] text-[#C4C4C4]"></span>
          <p className="text-[#4F4F4F]">Loading Chats...</p>
        </div>
      ) : (
        <div>
          {chats.map((chat: any) => (
            <div key={chat.id}>
              <p>{chat.id}</p>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
    </div>
  );
};

export default ChatPage;
