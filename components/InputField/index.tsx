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
};

export const InputField = ({
  color,
  placeholder,
  value,
  onChange,
  password,
}: Props) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={styles.container}
      style={{
        borderColor: focused ? color : "#f9f9fb",
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
      />
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
