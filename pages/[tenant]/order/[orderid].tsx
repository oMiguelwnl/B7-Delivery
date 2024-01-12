import styles from "../../../styles/Order-id.module.css";
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
import { ButtonWithIcon } from "@/components/ButtonWithIcon";
import { Address } from "@/types/Address";
import { Order } from "@/types/Order";

const OrderId = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if (data.user) setUser(data.user);
  }, [data.tenant, data.token, data.user]);

  const formatter = useFormatter();
  const router = useRouter();

  useEffect(() => {
    if (data.order.status !== "delivered") {
      setTimeout(() => {
        router.reload();
      }, 60000); // 60 seconds
    }
  }, [data.order.status,router ]);

  const orderStatusList = {
    preparing: {
      label: "Preparando",
      longLabel: "Preparando o seu pedido...",
      backgroundColor: "#FEFAE6",
      fontColor: "#D4BC34",
      pct: 25,
    },
    sent: {
      label: "Enviado",
      longLabel: "Enviamos o seu pedido!",
      backgroundColor: "#F1F3F8",
      fontColor: "#758CBD",
      pct: 75,
    },
    delivered: {
      label: "Entregue",
      longLabel: "Seu pedido foi entregue",
      backgroundColor: "#F1F8F6",
      fontColor: "#6AB70A",
      pct: 100,
    },
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>
          Pedido #${data.order.id} | {data.tenant.name}
        </title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}`}
        color={data.tenant.mainColor}
        title={`Pedido #${data.order.id}`}
      />

      {data.order.status !== "delivered" && (
        <div
          className={styles.statusArea}
          style={{
            backgroundColor: orderStatusList[data.order.status].backgroundColor,
          }}
        >
          <div
            className={styles.statusLongLable}
            style={{
              color: orderStatusList[data.order.status].fontColor,
            }}
          >
            {orderStatusList[data.order.status].longLabel}
          </div>
          <div className={styles.statusPct}>
            <div
              className={styles.statusPctBar}
              style={{
                backgroundColor: orderStatusList[data.order.status].fontColor,
                width: `${orderStatusList[data.order.status].pct}%`,
              }}
            ></div>
          </div>
          <div className={styles.statusMsg}>
            Aguardando mudança de status...
          </div>
        </div>
      )}

      <div className={styles.orderinfoArea}>
        <div
          className={styles.orderInfoStatus}
          style={{
            backgroundColor: orderStatusList[data.order.status].backgroundColor,
            color: orderStatusList[data.order.status].fontColor,
          }}
        >
          {orderStatusList[data.order.status].label}
        </div>
        <div className={styles.orderInfoQt}>
          {data.order.products.length}{" "}
          {data.order.products.length === 1 ? "item" : "itens"}
        </div>
        <div className={styles.orderInfoDate}>
          {formatter.formatDate(data.order.orderDate)}
        </div>
      </div>

      <div className={styles.productList}>
        {data.order.products.map((cartItem, index) => (
          <CartProductItem
            key={index}
            color={data.tenant.mainColor}
            quantity={cartItem.qt}
            product={cartItem.product}
            onChange={() => {}}
            noEdit
          />
        ))}
      </div>

      <div className={styles.infoGroup}>
        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Endereço</div>
          <div className={styles.infoBody}>
            <ButtonWithIcon
              color={data.tenant.mainColor}
              leftIcon={"location"}
              rightIcon={"rightArrow"}
              value={`${data.order.shippingAddress.street} ${data.order.shippingAddress.number} - ${data.order.shippingAddress.city}`}
              onClick={() => {}}
            />
          </div>
        </div>

        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Tipo de Pagamento</div>
          <div className={styles.infoBody}>
            <div className={styles.paymentTypes}>
              <div className={styles.paymentBtn}>
                <ButtonWithIcon
                  color={data.tenant.mainColor}
                  leftIcon="money"
                  value="Dinheiro"
                  onClick={() => {}}
                  fill={data.order.paymentType === "money"}
                />
              </div>
              <div className={styles.paymentBtn}>
                <ButtonWithIcon
                  color={data.tenant.mainColor}
                  leftIcon="card"
                  value="Cartão"
                  onClick={() => {}}
                  fill={data.order.paymentType === "card"}
                />
              </div>
            </div>
          </div>
        </div>

        {data.order.paymentType === "money" && (
          <div className={styles.infoArea}>
            <div className={styles.infoTitle}>Troco</div>
            <div className={styles.infoBody}>
              <InputField
                color={data.tenant.mainColor}
                placeholder="Quanto você tem em dinheiro?"
                value={data.order.paymentChange?.toString() ?? ""}
                onChange={() => {}}
              />
            </div>
          </div>
        )}

        {data.order.cupom && (
          <div className={styles.infoArea}>
            <div className={styles.infoTitle}>Cupom de desconto</div>
            <div className={styles.infoBody}>
              <ButtonWithIcon
                color={data.tenant.mainColor}
                leftIcon="cupom"
                rightIcon="checked"
                value={data.order.cupom.toUpperCase()}
              />
            </div>
          </div>
        )}
      </div>

      <div className={styles.resumeArea}>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Subtotal</div>
          <div className={styles.resumeRight}>
            {formatter.formatPrice(data.order.subtotal)}
          </div>
        </div>

        {data.order.cupomDiscount && (
          <div className={styles.resumeItem}>
            <div className={styles.resumeLeft}>Desconto</div>
            <div className={styles.resumeRight}>
              -{formatter.formatPrice(data.order.cupomDiscount)}
            </div>
          </div>
        )}

        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Frete</div>
          <div className={styles.resumeRight}>
            {data.order.shippingPrice > 0
              ? formatter.formatPrice(data.order.shippingPrice)
              : "--"}
          </div>
        </div>

        <div className={styles.resumeLine}></div>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Total</div>
          <div
            className={styles.resumeRightBig}
            style={{ color: data.tenant.mainColor }}
          >
            {formatter.formatPrice(data.order.total)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderId;

type Props = {
  tenant: Tenant;
  token: string;
  user: User | null;
  order: Order;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug, orderid } = context.query;
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
  const user = await api.authorizeToken(token as string);

  // GET Order
  const order = await api.getOrder(parseInt(orderid as string));
  return {
    props: {
      tenant,
      user,
      token,
      order,
    },
  };
};
