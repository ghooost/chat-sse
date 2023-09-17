export interface MessageData {
  id: number;
  message: string;
  authorId: string;
}

export interface MessageConnected {
  mode: "connected";
  userId: string;
}

export interface MessageMessage extends MessageData {
  mode: "message";
}

export type Message = MessageConnected | MessageMessage;
