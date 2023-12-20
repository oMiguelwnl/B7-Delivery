import styles from "./styles.module.css";
import BackIcon from "./backIcon.svg";
import Link from "next/link";

type Props = {
  backHref: string;
  color: string;
  title?: string;
  subTitle?: string;
  invert?: boolean;
};

export const Header = ({ backHref, color, title, subTitle, invert }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <Link href={backHref}>
          <div className={invert ? styles.buttonTransparent : ""}>
            <BackIcon color={invert ? "#fff" : color} />
          </div>
        </Link>
      </div>
      <div className={styles.centerSide}>
        {title && (
          <div
            style={{ color: invert ? "#fff" : "#1b1b1b" }}
            className={styles.title}
          >
            {title}
          </div>
        )}
        {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
      </div>
      <div className={styles.rightSide}></div>
    </div>
  );
};
