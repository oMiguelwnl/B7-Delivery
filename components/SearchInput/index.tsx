import styles from "./SearchInput.module.css";
import { useState } from "react";
import Frame from "./Frame.svg";
import { useAppContext } from "@/contexts/app";

type Props = {
  onSearch: (searchValue: string) => void;
};

export const SearchInput = ({ onSearch }: Props) => {
  const { tenant } = useAppContext();
  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onSearch(searchValue);
  };

  return (
    <div
      className={styles.container}
      style={{ borderColor: focused ? tenant?.mainColor : "#fff" }}
    >
      <div onClick={() => onSearch(searchValue)} className={styles.button}>
        <Frame color={tenant?.mainColor} />
      </div>
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
