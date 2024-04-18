"use client";

import { Message, User } from "@/type/type";
import "@/app/chat/chat.scss";
import { ChevronLeft, Paperclip } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { messages } from "@/app/data";
import Image from "next/image";

type Props = {
  selectedUser: User;
  currentUser: User;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
};
const BASE_CLASS = "chatbox";

export default function ChatBox({
  selectedUser,
  currentUser,
  setSelectedUser,
}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [filteredMessages, setFilteredMessage] = useState<Message[]>();
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  };

  //get message from localStorage
  useEffect(() => {
    const storedMessage = localStorage.getItem("messages");
    if (storedMessage) {
      try {
        const message: Message[] = JSON.parse(storedMessage);
        setMessages(message);
      } catch (error) {
        console.error("Error parsing message from localStorage:", error);
        setMessages([]);
      }
    } else {
      setMessages([]);
    }
  }, []);
  useEffect(() => {
    filteringMessage();
  }, [messages]);
  useEffect(() => {
    scrollToBottom();
  }, [filteredMessages]);

  //get message only currentUser and selectedUser
  const filteringMessage = () => {
    if (!messages) return;
    let tmpMessage = messages.filter(
      (message) =>
        (message.senderId === selectedUser.id &&
          message.receiverId === currentUser.id) ||
        (message.senderId === currentUser.id &&
          message.receiverId === selectedUser.id)
    );

    setFilteredMessage(tmpMessage);
  };

  //send the message when keyPress Enter
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      messages.push({
        id: `message_${Math.random()}`,
        senderId: currentUser.id,
        receiverId: selectedUser.id,
        message: message,
        image_url: "",
        created_at: new Date(),
      });
      //save the message in localStorage
      localStorage.setItem("messages", JSON.stringify(messages));
      setMessage("");
      filteringMessage();
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
        {filteredMessages &&
          filteredMessages.map((message) => (
            <>
              {message.senderId === selectedUser.id ? (
                <div className={`${BASE_CLASS}-content-received`}>
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
                <div className={`${BASE_CLASS}-content-sent`}>
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
