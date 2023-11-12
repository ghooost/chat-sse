import { UserId } from "@shared/messages";

import styles from "./styles.module.css";

interface IconProps {
  userId: UserId;
}

const COLORS = [
  "#ccccff",
  "#ccffcc",
  "#ffcccc",
  "#ccffff",
  "#ffccff",
  "#ffffcc",
];
const DEFAULT_ICON = {
  icon: "?",
  color: "#ccccff",
};
const EMODSI_RANGE = [128002, 128063];

const makeIdParser = () => {
  const cache = new Map<UserId, { icon: string; color: string }>();
  const emodsiDelta = EMODSI_RANGE[1] - EMODSI_RANGE[0];
  return (id: UserId) => {
    const ret = cache.get(id);
    if (ret) {
      return ret;
    }

    const iconIndex = (id % emodsiDelta) + EMODSI_RANGE[0];
    const colorIndex = Math.floor(id / emodsiDelta) % COLORS.length;
    const item = {
      icon: Number.isFinite(iconIndex)
        ? String.fromCodePoint(iconIndex)
        : DEFAULT_ICON.icon,
      color: Number.isFinite(colorIndex)
        ? COLORS[colorIndex]
        : DEFAULT_ICON.color,
    };
    cache.set(id, item);

    return item;
  };
};

const idParser = makeIdParser();

export const Icon = ({ userId }: IconProps) => {
  const { icon, color } = idParser(userId);
  return (
    <div className={styles.icon} style={{ backgroundColor: color }}>
      {icon}
    </div>
  );
};
