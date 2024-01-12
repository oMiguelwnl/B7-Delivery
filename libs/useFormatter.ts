export const useFormatter = () => {
  return {
    formatPrice: (price: number) => {
      return price.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "BRL",
      });
    },
    FormatQuantity: (qt: number, digits: number) => {
      if (qt < 10) {
        return `${`0`.repeat(digits)}${qt}`;
      } else {
        return qt;
      }
    },
    formatDate: (date: string) => {
      let currentDate = new Date(`${date} 00:00:00`);
      return new Intl.DateTimeFormat("pt-br").format(currentDate);
    },
  };
};
