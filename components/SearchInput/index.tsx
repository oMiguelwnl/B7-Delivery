import styles from "./SearchInput.module.css";
import { useState } from "react";

type Props = {
  color: string;
  onSearch: (searchValue: string) => void;
};

export const SearchInput = ({ color, onSearch }: Props) => {
  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      onSearch(searchValue);
    }
  };

  return (
    <div
      className={styles.container}
      style={{ borderColor: focused ? color : "#fff" }}
    >
      <div
        onClick={() => onSearch(searchValue)}
        className={styles.button}
      ></div>
      <input
        type="text"
        className={styles.input}
        placeholder="Digite o nome do produto"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyUp={handleKeyUp}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};
