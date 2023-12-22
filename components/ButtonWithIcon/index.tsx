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
  <div className={styles.container}>
    {leftIcon && (
      <div className={styles.leftSide}>
        <Icon
          color={fill ? "#fff" : color}
          icon={leftIcon}
          width={24}
          height={24}
        />
      </div>
    )}

    <div className={styles.centerSide}></div>
    <div className={styles.rightSide}></div>
  </div>
);
