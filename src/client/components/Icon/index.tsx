import styles from "./styles.module.css";

interface IconProps {
  userId: string;
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

const makeIdParser = () => {
  const cache = new Map<string, { icon: string; color: string }>();
  return (id: string) => {
    const ret = cache.get(id);
    if (ret) {
      return ret;
    }
    const [iconCode, colorCode] = id.split(".");
    const colorIndex = parseInt(colorCode);
    const iconIndex = parseInt(iconCode);
    const item = {
      icon: Number.isFinite(iconIndex)
        ? String.fromCodePoint(iconIndex)
        : DEFAULT_ICON.icon,
      color: Number.isFinite(colorIndex)
        ? COLORS[COLORS.length % colorIndex]
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
