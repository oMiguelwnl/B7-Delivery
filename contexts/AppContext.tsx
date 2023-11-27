import { Tenant } from "@/types/Tenant";
import { createContext, useContext, ReactNode, useState } from "react";

type AppContextType = {
  tenant: Tenant | null;
  setTenant: (newTenant: Tenant) => void;
};

const defaultValues: AppContextType = {
  tenant: null,
  setTenant: () => {},
};

const appContext = createContext<AppContextType>(defaultValues);

export const useAppContext = () => useContext(appContext);

type Props = {
  children: ReactNode;
};

export const AppContextProvider = ({ children }: Props) => {
  const [tenant, setTenant] = useState<Tenant | null>(null);

  return (
    <appContext.Provider value={{ tenant, setTenant }}>
      {children}
    </appContext.Provider>
  );
};
