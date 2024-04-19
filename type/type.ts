export interface User {
  id: string;
  name: string;
  avatar_url: string;
  isDoctor: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  image_url: string;
  created_at: Date;
}

export interface NewMessage {
  senderId: string;
  receiverId: string;
  message: string;
}

export interface ChatList {
  senderUser: User | undefined;
  receiverUser: User | undefined;
  message: string;
}
