import { Icon } from "@components/Icon";

import styles from "./styles.module.css";

interface ChatMessageProps {
  authorId: string;
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
      <pre className={styles.body}>{message}</pre>
    </div>
  );
};
