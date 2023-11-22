import { SearchInput } from "@/components/SearchInput";
import styles from "../../styles/Home.module.css";
import { Banner } from "@/components/Banner";

const TenantPage = () => {
  const handleSearch = (searchValue: string) => {
    console.log(`Você está buscando por: ${searchValue}`);
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerTopLeft}>
            <div className={styles.headerTitle}>Seja Bem-Vindo(a) 👋</div>
            <div className={styles.headersubTitle}>O que deseja pra hoje?</div>
          </div>

          <div className={styles.headerTopRight}>
            <div className={styles.menuButtom}>
              <div className={styles.menuButtomLine}></div>
              <div className={styles.menuButtomLine}></div>
              <div className={styles.menuButtomLine}></div>
            </div>
          </div>
        </div>

        <div className={styles.headerBottom}>
          <SearchInput color="#FB9400" onSearch={handleSearch} />
        </div>
      </header>

      <Banner />
    </div>
  );
};

export default TenantPage;
