"use client";

import { User } from "@/type/type";
import { useEffect, useState } from "react";
import "./chat.scss";
import ChatList from "../../components/ChatList/ChatList";
import ChatBox from "../../components/ChatBox/ChatBox";
const BASE_CLASS = "chat";

export default function Chat() {
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
            <ChatBox
              selectedUser={selectedUser}
              currentUser={currentUser}
              setSelectedUser={setSelectedUser}
            />
          )
        : currentUser && (
            <ChatList
              setSelectedUser={setSelectedUser}
              currentUser={currentUser}
            />
          )}
    </div>
  );
}
