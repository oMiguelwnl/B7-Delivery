export type Product = {
  id: number;
  image: string;
  categoryName: string;
  name: string;
  price: number;
  description?: string;
};
export const TEMPORARYoneProduct: Product = {
  id: 1,
  image: "/tmp/burger.png",
  categoryName: "Tradicional",
  name: "Texas Burger",
  price: 25.5,
  description:
    "2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal",
};
