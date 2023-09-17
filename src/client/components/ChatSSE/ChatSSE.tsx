import { KeyboardEvent, FormEvent, useRef } from "react";

import { ChatMessage } from "@components/ChatMessage";
import { Icon } from "@components/Icon";
import { MessageData } from "@shared/messages";
import { ObjectState } from "@stores/chat";

import styles from "./styles.module.css";

interface ChatSSEProps {
  userId: string;
  chatState: ObjectState;
  sendMessageState: ObjectState;
  messages: MessageData[];
  onSubmitMessage: (message: string) => void;
}

export const ChatSSE = ({
  chatState,
  sendMessageState,
  messages,
  userId,
  onSubmitMessage,
}: ChatSSEProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = data.get("message")?.toString() ?? "";
    onSubmitMessage(message);
  };

  const handleEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!formRef.current) {
      return;
    }
    if (e.code == "Enter" && e.shiftKey == false) {
      e.preventDefault();
      formRef.current.requestSubmit();
    }
  };

  return (
    <section className={styles.chatSse}>
      {chatState === "error" && (
        <section className={styles.chatError}>Error</section>
      )}
      {chatState === "loading" && (
        <section className={styles.chatLoading}>Loading</section>
      )}
      {chatState === "ready" && (
        <>
          {sendMessageState !== "loading" && (
            <form ref={formRef} onSubmit={handleSubmit}>
              <section className={styles.form}>
                <div className={styles.formIcon}>
                  <Icon userId={userId} />
                </div>
                <textarea
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  name="message"
                  defaultValue=""
                  className={styles.formText}
                  placeholder="Type message and press Enter"
                  onKeyDown={handleEnterPress}
                />
              </section>
            </form>
          )}
          {sendMessageState === "loading" && (
            <section className={styles.messageLoading}>Loading</section>
          )}
          <section className={styles.messages}>
            {messages.map((_, index, array) => {
              const { message, id, authorId } = array[array.length - 1 - index];
              return (
                <ChatMessage
                  key={id}
                  authorId={authorId}
                  message={message}
                  isOwn={authorId === userId}
                />
              );
            })}
          </section>
        </>
      )}
    </section>
  );
};
