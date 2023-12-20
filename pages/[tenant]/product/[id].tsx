import styles from "../../../styles/Product-id.module.css";
import { GetServerSideProps } from "next";
import { useApi } from "@/libs/useApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/app";
import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import Head from "next/head";
import { Header } from "@/components/Header";
import Image from "next/image";
import { Button } from "@/components/Button";
import { useFormatter } from "@/libs/useFormatter";
import { Quantity } from "@/components/Quantity";
import { CartCookie } from "@/types/CartCookie";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import Router, { useRouter } from "next/router";

const Product = (data: Props) => {
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  const router = useRouter();
  const formatter = useFormatter();

  const [qtCount, setQtCount] = useState(1);
  const handleUpdateQt = (newCount: number) => {
    setQtCount(newCount);
  };

  const handleAddCart = () => {
    let cart: CartCookie[] = [];

    // create or get existing cart
    if (hasCookie("cart")) {
      const cartCookie = getCookie("cart");
      const cartJson: CartCookie[] = JSON.parse(cartCookie as string);
      for (let i in cartJson) {
        if (cartJson[i].qt && cartJson[i].id) {
          cart.push(cartJson[i]);
        }
      }
    }

    // search product in cart
    const cartIndex = cart.findIndex((item) => item.id === data.product.id);
    if (cartIndex > -1) {
      cart[cartIndex].qt += qtCount;
    } else {
      cart.push({ id: data.product.id, qt: qtCount });
    }

    // setting cookie
    setCookie("cart", JSON.stringify(cart));

    // going to cart
    Router.push(`/${data.tenant.slug}/cart`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {data.product.name} | {data.tenant.name}
        </title>
      </Head>
      <div className={styles.headerArea}>
        <Header
          color={data.tenant.mainColor}
          backHref={`/${data.tenant.slug}`}
          title="Produto"
          invert
        />
      </div>
      <div
        className={styles.headerBg}
        style={{ backgroundColor: data.tenant.mainColor }}
      ></div>
      <div className={styles.productImage}>
        <Image
          src={data.product.image}
          width={319}
          height={282}
          alt="Product Image"
        />
      </div>

      <div className={styles.category}>{data.product.categoryName}</div>
      <div
        className={styles.title}
        style={{ borderBottomColor: data.tenant.mainColor }}
      >
        {data.product.name}
      </div>
      <div className={styles.line}></div>

      <div className={styles.description}>{data.product.description}</div>

      <div className={styles.qtText}>Quantidade</div>

      <div className={styles.area}>
        <div className={styles.areaLeft}>
          <Quantity
            color={data.tenant.mainColor}
            count={qtCount}
            onUpdateCount={handleUpdateQt}
            min={1}
          />
        </div>
        <div
          className={styles.areaRight}
          style={{ color: data.tenant.mainColor }}
        >
          {formatter.formatPrice(data.product.price)}
        </div>
      </div>

      <div className={styles.buttonArea}>
        <Button
          color={data.tenant.mainColor}
          label="Adicionar à sacola"
          onClick={handleAddCart}
          fill
        />
      </div>
    </div>
  );
};

export default Product;

type Props = {
  tenant: Tenant;
  product: Product;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug, id } = context.query;
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
  // GET Product
  const product = await api.getProduct(parseInt(id as string));
  return {
    props: {
      tenant,
      product,
    },
  };
};
