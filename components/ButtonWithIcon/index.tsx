import { Icon } from "../Icon";
import styles from "./style.module.css";

type Props = {
  color: string;
  leftIcon?: string;
  rightIcon?: string;
  value: string;
  onClick?: () => void;
  fill?: boolean;
};
export const ButtonWithIcon = ({
  color,
  leftIcon,
  rightIcon,
  value,
  onClick,
  fill,
}: Props) => (
  <div
    className={styles.container}
    style={{ backgroundColor: fill ? color : "#F9F9FB" }}
    onClick={onClick}
  >
    {leftIcon && (
      <div
        className={styles.leftSide}
        style={{ backgroundColor: fill ? "rgba(0,0,0,.05)" : "#fff" }}
      >
        <Icon
          color={fill ? "#fff" : color}
          svg={leftIcon}
          width={24}
          height={24}
        />
      </div>
    )}

    <div
      className={styles.centerSide}
      style={{ color: fill ? "#fff" : "#1b1b1b" }}
    >
      {value}
    </div>

    {rightIcon && (
      <div className={styles.rightSide}>
        <Icon color={color} svg={rightIcon} width={24} height={24} />
      </div>
    )}
  </div>
);
