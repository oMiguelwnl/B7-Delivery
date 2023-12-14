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
          mainColor: "#FFA500",
          secondColor: "#000000",
        };
      case "B7Pizza":
        return {
          slug: "B7Pizza",
          name: "B7Pizza",
          mainColor: "#0000FF",
          secondColor: "#000000",
        };
      default:
        return false;
    }
  },
  getAllProducts: async () => {
    let products = [];

    for (let q = 0; q < 10; q++) {
      products.push(temporaryProduct);
    }
    return products;
  },

  getProduct: async (id: string) => {
    return temporaryProduct;
  },
});
