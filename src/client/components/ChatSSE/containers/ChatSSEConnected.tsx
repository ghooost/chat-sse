import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { ChatSSE } from "../ChatSSE";

import { Message, MessageData } from "@shared/messages";
import {
  selectChatState,
  selectSendMessageState,
  selectUserId,
  sendMessage,
  sendPing,
  setChatState,
  setUserId,
} from "@stores/chat";
import { useAppDispatch } from "@stores/store";

const PING_TIMEOUT = 30000;

export const ChatSSEConnected = () => {
  const dispatch = useAppDispatch();
  const userId = useSelector(selectUserId);
  const chatState = useSelector(selectChatState);
  const sendMessageState = useSelector(selectSendMessageState);
  const eventSource = useRef<EventSource | null>(null);
  const [messages, addMessage] = useState<MessageData[]>([]);

  useEffect(() => {
    if (eventSource.current !== null) {
      return;
    }
    dispatch(setChatState("loading"));
    eventSource.current = new EventSource(
      `${import.meta.env.VITE_API_BASE}/sse`
    );
    const handleMessage = ({ data }: MessageEvent<string>) => {
      const parsed = JSON.parse(data) as Message;
      switch (parsed.mode) {
        case "connected":
          dispatch(setUserId(parsed.userId));
          dispatch(setChatState("ready"));
          break;
        case "message":
          if (parsed.message) {
            addMessage((messages) => messages.concat([parsed]));
          }
          break;
      }
    };
    eventSource.current.onmessage = handleMessage;

    return () => {
      if (eventSource.current === null) {
        return;
      }
      eventSource.current.onmessage = null;
      eventSource.current.close();
      eventSource.current = null;
      dispatch(setChatState("undefined"));
    };
  }, [dispatch]);

  useEffect(() => {
    // reset ping for userId
    if (!userId) {
      return;
    }
    const timer = setInterval(() => {
      dispatch(sendPing(userId));
    }, PING_TIMEOUT);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch, userId]);

  const handleSubmitMessage = (message: string) => {
    dispatch(
      sendMessage({
        userId,
        message,
      })
    );
  };

  return (
    <ChatSSE
      chatState={chatState}
      sendMessageState={sendMessageState}
      messages={messages}
      userId={userId}
      onSubmitMessage={handleSubmitMessage}
    />
  );
};
