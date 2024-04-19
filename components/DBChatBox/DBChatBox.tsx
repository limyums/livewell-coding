"use client";

import { Message, NewMessage, User } from "@/type/type";
import "@/app/chat/chat.scss";
import { ChevronLeft, Paperclip } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createMessage, getMessageByUser } from "@/app/action/message";

type Props = {
  selectedUser: User;
  currentUser: User;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
};

const BASE_CLASS = "chatbox";
export default function DBChatBox({
  selectedUser,
  currentUser,
  setSelectedUser,
}: Props) {
  const [messagArray, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isSent, setIsSent] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  };

  //get message from localStorage
  useEffect(() => {
    fetchMessage(currentUser.id, selectedUser.id);
  }, [currentUser, selectedUser]);

  useEffect(() => {
    fetchMessage(currentUser.id, selectedUser.id);
  }, [isSent, currentUser, selectedUser]);

  const fetchMessage = async (id: string, selectedId: string) => {
    try {
      const messages = await getMessageByUser(id, selectedId);

      setMessages(messages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const sendMessage = async (newMessage: NewMessage) => {
    try {
      const success = await createMessage(newMessage);
      if (success) {
        setMessage("");
        setIsSent(Math.random());
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagArray]);

  //send the message when keyPress Enter
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newMessage: NewMessage = {
        senderId: currentUser.id,
        receiverId: selectedUser.id,
        message: message,
      };
      sendMessage(newMessage);
    }
  };
  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleFileUpload = (e: any) => {
    //file upload
  };
  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}-header`}>
        <button
          type="button"
          className="btn-lg btn-trans"
          onClick={() => {
            setSelectedUser(null);
          }}
        >
          <ChevronLeft />
        </button>
      </div>

      <div className={`${BASE_CLASS}-content`} ref={contentRef}>
        {messagArray &&
          messagArray.map((message, index) => (
            <>
              {message.senderId === selectedUser.id ? (
                <div
                  className={`${BASE_CLASS}-content-received`}
                  key={`${index}-${message.id}`}
                >
                  <div>
                    <Image
                      src={selectedUser.avatar_url}
                      width={40}
                      height={40}
                      alt="user"
                    />
                  </div>
                  <div>
                    <label>{selectedUser.name}</label>
                    <p>{message.message}</p>
                  </div>
                </div>
              ) : (
                <div
                  className={`${BASE_CLASS}-content-sent`}
                  key={`${index}-${message.id}`}
                >
                  {message.image_url && (
                    <Image
                      src={message.image_url}
                      width={50}
                      height={50}
                      alt="img"
                    />
                  )}
                  {message.message}
                </div>
              )}
            </>
          ))}
      </div>
      <div className={`${BASE_CLASS}-input`}>
        <Paperclip />
        <textarea
          name="message"
          value={message}
          placeholder={`Message to ${selectedUser.name}`}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}
