import { User } from "@/styles/User";
import { Address } from "@/types/Address";
import { CartItem } from "@/types/CartItem";
import { Product } from "@/types/Product";
import { Tenant } from "@/types/Tenant";

const temporaryProduct: Product = {
  id: 1,
  image: "/tmp/burger.png",
  categoryName: "Tradicional",
  name: "Texas Burger",
  price: 25.5,
  description:
    "2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal",
};

export const useApi = (tenantSlug: string) => ({
  getTenant: async () => {
    switch (tenantSlug) {
      case "b7burger":
        return {
          slug: "b7burger",
          name: "b7burger",
          mainColor: "#FB9400",
          secondColor: "#FFF9F2",
        };
      case "B7Pizza":
        return {
          slug: "B7Pizza",
          name: "B7Pizza",
          mainColor: "#6AB70A",
          secondColor: "#E0E0E0",
        };
      default:
        return false;
    }
  },
  getAllProducts: async () => {
    let products = [];

    for (let q = 0; q < 10; q++) {
      products.push({ ...temporaryProduct, id: q + 1 });
    }
    return products;
  },

  getProduct: async (id: number) => {
    return { ...temporaryProduct, id };
  },

  authorizeToken: async (token: string): Promise<User | false> => {
    if (!token) return false;
    return {
      name: "Miguel",
      email: "suporte@mg.com.br",
    };
  },

  getCartProducts: async (cartCookie: string) => {
    let cart: CartItem[] = [];

    if (!cartCookie) return cart;

    const cartJson = JSON.parse(cartCookie);

    for (let i in cartJson) {
      if (cartJson[i].id && cartJson[i].qt) {
        const product = {
          ...temporaryProduct,
          id: cartJson[i].id,
        };
        cart.push({
          qt: cartJson[i].qt,
          product,
        });
      }
    }
    return cart;
  },
  getUserAddresses: async (email: string) => {
    const addresses: Address[] = [];

    for (let i = 0; i < 4; i++) {
      addresses.push({
        id: i + 1,
        street: "Rua das Flores",
        number: `${i + 1}00`,
        cep: "9999999",
        city: "São Paulo",
        neighborhood: "Jardins",
        state: "SP",
      });
    }

    return addresses;
  },
});
