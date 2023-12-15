import { createContext, useReducer } from "react";
import { ContextType, DataType, ProviderType } from "./types";
import { reducer } from "./reducer";
export { useAppContext } from "./hook";

const initialState: DataType = {
  tenant: null,
};

export const AppContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
});

export const Provider = ({ children }: ProviderType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
