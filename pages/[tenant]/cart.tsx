import styles from "../../styles/Cart.module.css";
import { GetServerSideProps } from "next";
import { useApi } from "@/libs/useApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/app";
import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { getCookie, setCookie } from "cookies-next";
import { User } from "@/styles/User";
import { useAuthContext } from "@/contexts/auth";
import Head from "next/head";
import { Header } from "@/components/Header";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/Button";
import { useFormatter } from "@/libs/useFormatter";
import { CartItem } from "@/types/CartItem";
import { useRouter } from "next/router";
import { CartProductItem } from "@/components/CartProductItem/CartProductItem";
import { CartCookie } from "@/types/CartCookie";

const Cart = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if (data.user) setUser(data.user);
  }, [data.tenant, data.token, data.user]);

  const formatter = useFormatter();
  const router = useRouter();

  // Product Control
  const [cart, setCart] = useState<CartItem[]>(data.cart);

  const handleCartChange = (newCount: number, id: number) => {
    const tempCart: CartItem[] = [...cart];
    const cartIndex = tempCart.findIndex((item) => item.product.id === id);

    if (newCount > 0) {
      tempCart[cartIndex].qt = newCount;
    } else {
      tempCart.splice(cartIndex, 1); // Remove the item from the array
    }

    setCart([...tempCart]);

    // update cookie
    let cartCookie: CartCookie[] = tempCart.map((item) => ({
      id: item.product.id,
      qt: item.qt,
    }));

    setCookie("cart", JSON.stringify(cartCookie));
  };

  // Shipping
  const [shippingInput, setShippingInput] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [shippingTime, setShippingTime] = useState(0);
  const [shippingAddress, setShippingAddress] = useState("");

  const handleShippingCalc = () => {
    setShippingAddress("Rua do Céu");
    setShippingPrice(9.5);
    setShippingTime(20);
  };

  // Resume
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    let sub = 0;
    for (let i in cart) {
      sub += cart[i].product.price * cart[i].qt;
    }
    setSubTotal(sub);
  }, [cart]);

  const handleFinish = () => {
    router.push(`/${data.tenant.slug}/checkout`);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Sacola | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}`}
        color={data.tenant.mainColor}
        title="Sacola"
      />

      <div className={styles.productsQuantity}>
        {cart.length} {cart.length === 1 ? "item" : "itens"}
      </div>

      <div className={styles.productList}>
        {cart.map((cartItem, index) => (
          <CartProductItem
            key={index}
            color={data.tenant.mainColor}
            quantity={cartItem.qt}
            product={cartItem.product}
            onChange={handleCartChange}
          />
        ))}
      </div>

      <div className={styles.shippingArea}>
        <div className={styles.shippingTitle}>Calcular frete e prazo</div>
        <div className={styles.shippingForm}>
          <InputField
            color={data.tenant.mainColor}
            placeholder="12345-123"
            value={shippingInput}
            onChange={(newValue) => setShippingInput(newValue)}
          />
          <Button
            color={data.tenant.mainColor}
            label="OK"
            onClick={handleShippingCalc}
          />
        </div>
        {shippingTime > 0 && (
          <div className={styles.shippingInfo}>
            <div className={styles.shippingAddress}>{shippingAddress}</div>
            <div className={styles.shippingTime}>
              <div className={styles.shippingTimeText}>
                Receba em até {shippingTime} minutos
              </div>
              <div
                className={styles.shippingPrice}
                style={{ color: data.tenant.mainColor }}
              >
                {formatter.formatPrice(shippingPrice)}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.resumeArea}>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Subtotal</div>
          <div className={styles.resumeRight}>
            {formatter.formatPrice(subTotal)}
          </div>
        </div>

        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Frete</div>
          <div className={styles.resumeRight}>
            {shippingPrice > 0 ? formatter.formatPrice(shippingPrice) : "--"}
          </div>
        </div>

        <div className={styles.resumeLine}></div>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Total</div>
          <div
            className={styles.resumeRightBig}
            style={{ color: data.tenant.mainColor }}
          >
            {formatter.formatPrice(shippingPrice + subTotal)}
          </div>
        </div>

        <div className={styles.resumeButton}>
          <Button
            color={data.tenant.mainColor}
            label="Continuar"
            onClick={handleFinish}
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;

type Props = {
  tenant: Tenant;
  token: string;
  user: User | null;
  cart: CartItem[];
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

  // GET Cart Products
  const cartCookie = getCookie("cart", context);
  const cart = await api.getCartProducts(cartCookie as string);

  return {
    props: {
      tenant,
      user,
      token,
      cart,
    },
  };
};
