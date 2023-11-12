import { Icon } from "@components/Icon";
import { UserId } from "@shared/messages";

import styles from "./styles.module.css";

interface ChatMessageProps {
  authorId: UserId;
  message: string;
  isOwn: boolean;
}

export const ChatMessage = ({ authorId, message, isOwn }: ChatMessageProps) => {
  return (
    <div
      className={`${styles.message} ${
        isOwn ? styles.messageOwn : styles.messageOther
      }`}
    >
      <div className={styles.icon}>
        <Icon userId={authorId} />
      </div>
      <div className={styles.body}>{message}</div>
    </div>
  );
};
