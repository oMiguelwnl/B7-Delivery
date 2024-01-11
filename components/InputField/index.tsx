import styles from "./styles.module.css";
import EyeOff from "./EyeOff.svg";
import EyeOn from "./EyeOn.svg";
import { useState } from "react";

type Props = {
  color: string;
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
  password?: boolean;
  warning?: boolean;
  errorMessage?: string;
  onEnterPress?: () => void;
};

export const InputField = ({
  color,
  placeholder,
  value,
  onChange,
  password,
  warning,
  errorMessage,
  onEnterPress,
}: Props) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`${styles.container} ${errorMessage ? styles.error : ""}`}
      style={{
        borderColor: !warning ? (focused ? color : "#f9f9fb") : "#ff0000",
        backgroundColor: focused ? "#fff" : "#f9f9fb",
      }}
    >
      <input
        type={password ? (showPassword ? "text" : "password") : "text"}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && onEnterPress) {
            onEnterPress();
          }
        }}
      />
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      {password && (
        <div
          onClick={() => setShowPassword(!showPassword)}
          className={styles.showPassword}
        >
          {showPassword && <EyeOn color="#bbb" />}
          {!showPassword && <EyeOff color="#bbb" />}
        </div>
      )}
    </div>
  );
};
