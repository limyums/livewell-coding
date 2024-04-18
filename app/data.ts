import { Message, User } from "@/type/type";

export const users: User[] = [
  {
    id: "user1",
    name: "Doctor",
    avatar_url: "https://randomuser.me/api/portraits/women/26.jpg",
    messageId: [],
    isDoctor: true,
  },
  {
    id: "user2",
    name: "Brian",
    avatar_url: "https://randomuser.me/api/portraits/men/22.jpg",
    messageId: [],
    isDoctor: false,
  },
  {
    id: "user3",
    name: "Solomon",
    avatar_url: "https://randomuser.me/api/portraits/men/28.jpg",
    messageId: [],
    isDoctor: false,
  },
  {
    id: "user4",
    name: "Chrissy",
    avatar_url: "https://randomuser.me/api/portraits/women/22.jpg",
    messageId: [],
    isDoctor: false,
  },
  {
    id: "user5",
    name: "David",
    avatar_url: "https://randomuser.me/api/portraits/men/20.jpg",
    messageId: [],
    isDoctor: false,
  },
];

export const messages: Message[] = [];
