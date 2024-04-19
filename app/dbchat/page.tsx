"use client";

import { User } from "@/type/type";
import { useEffect, useState } from "react";
import "../chat/chat.scss";
import DBChatBox from "@/components/DBChatBox/DBChatBox";
import DBChatList from "@/components/DBChatList/DBChatList";

const BASE_CLASS = "chat";

export default function DBchat() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  //const [isSelect, setIsSelect] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  // Load currentUser from localStorage when the component mounts
  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser");

    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Error parsing currentUser from localStorage:", error);
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, []);
  return (
    <div className={BASE_CLASS}>
      {selectedUser
        ? currentUser && (
            <DBChatBox
              selectedUser={selectedUser}
              currentUser={currentUser}
              setSelectedUser={setSelectedUser}
            />
          )
        : currentUser && (
            <DBChatList
              setSelectedUser={setSelectedUser}
              currentUser={currentUser}
            />
          )}
    </div>
  );
}
