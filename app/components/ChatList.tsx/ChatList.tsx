import { ChatList as UserChatList, Message, User } from "@/type/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "@/app/chat/chat.scss";
import { users } from "@/app/data";

type Props = {
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
  currentUser: User;
};

const BASE_CLASS = "chatlist";

export default function ChatList({ setSelectedUser, currentUser }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatList, setChatList] = useState<UserChatList[]>([]);

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

  //making chat list when Message loaded
  useEffect(() => {
    if (!messages) return;
    // step 1 : get current user Message
    let tmpMessage = messages.filter(
      (message) =>
        message.receiverId === currentUser.id ||
        message.senderId === currentUser.id
    );
    // step 2 : remove duplicated message
    const uniqueMessages = new Set();
    let tmpMessageList = tmpMessage.filter((message) => {
      // Define a unique identifier for each message
      const uniqueId1 = `${message.senderId}-${message.receiverId}`;
      const uniqueId2 = `${message.receiverId}-${message.senderId}`;

      if (uniqueMessages.has(uniqueId1) || uniqueMessages.has(uniqueId2)) {
        return false; // Skip this message if it's a duplicate
      } else {
        uniqueMessages.add(uniqueId1);
        uniqueMessages.add(uniqueId2);
        return true;
      }
    });
    // step 3 : making new list to generate Chat List
    const tmpList: UserChatList[] = tmpMessageList.map((message) => {
      const sender = users.find((user) => user.id === message.senderId);
      const receiver = users.find((user) => user.id === message.receiverId);

      const chatListItem: UserChatList = {
        senderUser: sender,
        receiverUser: receiver,
        message: message.message,
      };

      return chatListItem;
    });
    setChatList(tmpList);
  }, [messages, currentUser]);

  const openExistChat = (chatList: UserChatList) => {
    if (chatList.senderUser && chatList.senderUser.id != currentUser.id) {
      setSelectedUser(chatList.senderUser);
    }
    if (chatList.receiverUser && chatList.receiverUser.id != currentUser.id) {
      setSelectedUser(chatList.receiverUser);
    }
  };
  return (
    <ul className={BASE_CLASS}>
      <li
        onClick={() => {
          setIsOpen(true);
        }}
      >
        New Message
      </li>
      {chatList &&
        chatList.map((message, index) => (
          <li
            key={`${index}-${message.receiverUser?.id}-${message.senderUser?.id}`}
            onClick={() => openExistChat(message)}
          >
            {message.senderUser && message.senderUser.id != currentUser.id && (
              <label>{message.senderUser.name}</label>
            )}
            {message.receiverUser &&
              message.receiverUser.id != currentUser.id && (
                <label>{message.receiverUser.name}</label>
              )}
            <p>{message.message}</p>
          </li>
        ))}
      <div className={`init_popup ${isOpen ? "popup" : ""}`}>
        <div className="popup_wrap">
          {currentUser.isDoctor ? (
            <>
              {users.map(
                (user, index) =>
                  user.id != currentUser.id && (
                    <button
                      key={`${index}-${user.id}`}
                      type="button"
                      className="btn-lg btn-blue"
                      onClick={() => {
                        setIsOpen(false);
                        setSelectedUser(user);
                      }}
                    >
                      {user.name}
                    </button>
                  )
              )}
            </>
          ) : (
            <>
              {users.map(
                (user, index) =>
                  user.id != currentUser.id &&
                  user.isDoctor && (
                    <button
                      key={`${index}-${user.id}`}
                      type="button"
                      className="btn-lg btn-blue"
                      onClick={() => {
                        setIsOpen(false);
                        setSelectedUser(user);
                      }}
                    >
                      {user.name}
                    </button>
                  )
              )}
            </>
          )}

          <button
            type="button"
            className="btn-lg btn-black"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </ul>
  );
}
