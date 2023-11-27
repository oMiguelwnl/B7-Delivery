import { Tenant } from "@/types/Tenant";

export const useApi = () => ({
  getTenant: (tenantSlug: string): boolean | Tenant => {
    switch (tenantSlug) {
      case "b7burger":
        return {
          slug: "b7burger",
          name: "b7burger",
          mainColor: "#ff0000",
          secondColor: "#00ff00",
        };
      case "B7Pizza":
        return {
          slug: "B7Pizza",
          name: "B7Pizza",
          mainColor: "#ff0000",
          secondColor: "#000000",
        };
      default:
        return false;
    }
  },
});
