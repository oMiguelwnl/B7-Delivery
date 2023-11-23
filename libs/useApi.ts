export type getTenantResponse = {
  name: string;
  mainColor: string;
  secondColor: string;
};

export const useApi = () => ({
  getTenant: (tenantSlug: string): boolean | getTenantResponse => {
    switch (tenantSlug) {
      case "b7burger":
        return {
          name: "b7burger",
          mainColor: "#ff0000",
          secondColor: "#00ff00",
        };
      case "B7Pizza":
        return {
          name: "B7Pizza",
          mainColor: "#ff0000",
          secondColor: "#000000",
        };
      default:
        return false;
    }
  },
});
