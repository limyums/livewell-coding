import { ChatList as UserChatList, Message, User } from "@/type/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "@/app/chat/chat.scss";
import { users } from "@/app/data";
import { getUser } from "@/app/action/user";
import {
  getMessage,
  getMessageByUser,
  getMessageByUserList,
} from "@/app/action/message";

type Props = {
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
  currentUser: User;
};

const BASE_CLASS = "chatlist";

export default function DBChatList({ setSelectedUser, currentUser }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatList, setChatList] = useState<UserChatList[]>([]);
  const [dbUsers, setDBUsers] = useState<User[]>();

  useEffect(() => {
    fetchUser();
    fetchMessage(currentUser.id);
  }, [currentUser]);

  const fetchUser = async () => {
    try {
      const users = await getUser();
      setDBUsers(users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMessage = async (id: string) => {
    try {
      const message = await getMessageByUserList(id);
      setMessages(message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //making chat list when Message loaded
  useEffect(() => {
    if (!messages || !dbUsers) return;
    // step 2 : remove duplicated message

    const uniqueMessages = new Set();
    let tmpMessageList = messages.filter((message) => {
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
      const sender = dbUsers.find((user) => user.id === message.senderId);
      const receiver = dbUsers.find((user) => user.id === message.receiverId);

      const chatListItem: UserChatList = {
        senderUser: sender,
        receiverUser: receiver,
        message: message.message,
      };
      return chatListItem;
    });
    setChatList(tmpList);
  }, [messages, currentUser, dbUsers]);

  const openExistChat = (chatList: UserChatList) => {
    console.log(chatList);
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
              {dbUsers &&
                dbUsers.map(
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
              {dbUsers &&
                dbUsers.map(
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
