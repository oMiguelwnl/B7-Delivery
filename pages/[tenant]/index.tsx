import { SearchInput } from "@/components/SearchInput";
import styles from "../../styles/Home.module.css";
import { Banner } from "@/components/Banner";
import ProductItem from "@/components/ProductItem";
import { GetServerSideProps } from "next";
import { useApi } from "@/libs/useApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/app";
import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { Sidebar } from "@/components/SideBar";
import { getCookie } from "cookies-next";
import { User } from "@/styles/User";
import { useAuthContext } from "@/contexts/auth";
import NoItemsIcon from "../../public/assets/noItems.svg";

const TenantPage = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if (data.user) setUser(data.user);
  }, []);

  const [products, setProducts] = useState<Product[]>(data.products);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Search
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchtext] = useState("");
  const handleSearch = (searchValue: string) => setSearchtext(searchValue);
  useEffect(() => {
    let newFilteredProducts: Product[] = [];

    for (let product of data.products) {
      if (product.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        newFilteredProducts.push(product);
      }
    }
    setFilteredProducts(newFilteredProducts);
  }, [data.products, searchText]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerTopLeft}>
            <div className={styles.headerTitle}>Seja Bem-Vindo(a) 👋</div>
            <div className={styles.headersubTitle}>O que deseja pra hoje?</div>
          </div>

          <div className={styles.headerTopRight}>
            <div
              className={styles.menuButtom}
              onClick={() => setSidebarOpen(true)}
            >
              <div
                className={styles.menuButtomLine}
                style={{ backgroundColor: tenant?.mainColor }}
              ></div>
              <div
                className={styles.menuButtomLine}
                style={{ backgroundColor: tenant?.mainColor }}
              ></div>
              <div
                className={styles.menuButtomLine}
                style={{ backgroundColor: tenant?.mainColor }}
              ></div>
            </div>
          </div>
          <Sidebar
            tenant={data.tenant}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </div>

        <div className={styles.headerBottom}>
          <SearchInput onSearch={handleSearch} />
        </div>
      </header>
      {searchText && (
        <>
          <div className={styles.searchtext}>
            Procurando por : <strong>{searchText}</strong>
          </div>

          {filteredProducts.length > 0 && (
            <div className={styles.grid}>
              {filteredProducts.map((item, index) => (
                <ProductItem key={index} data={item} />
              ))}
            </div>
          )}
        </>
      )}
      {!searchText && (
        <>
          <Banner />

          <div className={styles.grid}>
            {products.map((item, index) => (
              <ProductItem key={index} data={item} />
            ))}
          </div>
        </>
      )}
      {filteredProducts.length === 0 && (
        <div className={styles.noProducts}>
          <NoItemsIcon color="#E0E0E0" />
          <div className={styles.noProductstext}>
            Ops! Não há itens com este nome
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantPage;

type Props = {
  tenant: Tenant;
  products: Product[];
  token: string;
  user: User | null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi(tenantSlug as string);

  // GET Tenant
  const tenant = await api.getTenant();

  if (!tenant) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // GET Logged User

  const token = getCookie("token", context);
  const user = await api.authotizeToken(token as string);

  // GET Products

  const products = await api.getAllProducts();
  return {
    props: {
      tenant,
      products,
      user,
      token,
    },
  };
};
