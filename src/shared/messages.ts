export type UserId = number;

export interface MessageData {
  id: number;
  authorId: UserId;
  body: string;
}

export interface MessageConnect {
  mode: "connect";
  userId: UserId;
  messages: MessageData[];
}

export interface MessageMessage {
  mode: "message";
  message: MessageData;
}

export type Message = MessageConnect | MessageMessage;
