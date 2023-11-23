import { SearchInput } from "@/components/SearchInput";
import styles from "../../styles/Home.module.css";
import { Banner } from "@/components/Banner";
import ProductItem from "@/components/ProductItem";
import { GetServerSideProps } from "next";
import { getTenantResponse, useApi } from "@/libs/useApi";

const TenantPage = (data: Props) => {
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
              <div
                className={styles.menuButtomLine}
                style={{ backgroundColor: data.tenant.mainColor }}
              ></div>
              <div
                className={styles.menuButtomLine}
                style={{ backgroundColor: data.tenant.mainColor }}
              ></div>
              <div
                className={styles.menuButtomLine}
                style={{ backgroundColor: data.tenant.mainColor }}
              ></div>
            </div>
          </div>
        </div>

        <div className={styles.headerBottom}>
          <SearchInput color={data.tenant.mainColor} onSearch={handleSearch} />
        </div>
      </header>

      <Banner />

      <div className={styles.grid}>
        <ProductItem
          data={{
            id: 1,
            image: "/tmp/burger.png",
            categoryName: "Tradicional",
            name: "Texas Burger",
            price: "R$ 25,50",
          }}
          mainColor={data.tenant.mainColor}
          secondColor={data.tenant.secondColor}
        />

        <ProductItem
          data={{
            id: 2,
            image: "/tmp/burger.png",
            categoryName: "Tradicional",
            name: "Texas Burger",
            price: "R$ 25,50",
          }}
          mainColor={data.tenant.mainColor}
          secondColor={data.tenant.secondColor}
        />

        <ProductItem
          data={{
            id: 3,
            image: "/tmp/burger.png",
            categoryName: "Tradicional",
            name: "Texas Burger",
            price: "R$ 25,50",
          }}
          mainColor="#fb9400"
          secondColor="#fff9f2"
        />
      </div>
    </div>
  );
};

export default TenantPage;

type Props = {
  tenant: getTenantResponse;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi();

  // GET Tenant
  const tenant = await api.getTenant(tenantSlug as string);

  if (!tenant) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      tenant,
    },
  };
};
