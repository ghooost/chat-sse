import styles from "./styles.module.css";

interface ChatMessageProps {
  icon: string;
  message: string;
  isOwn: boolean;
}

export const ChatMessage = ({ icon, message, isOwn }: ChatMessageProps) => {
  return (
    <div className={`${styles.root} ${isOwn ? "message-my" : "message-other"}`}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.message}>{message}</div>
    </div>
  );
};
