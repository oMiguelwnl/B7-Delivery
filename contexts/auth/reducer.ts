import { DataType, ActionType, Actions } from "./types";

export const reducer = (state: DataType, action: ActionType) => {
  switch (action.type) {
    case Actions.SET_TOKEN:
      if (!action.payload.token) return { ...state, token: "", user: null };
      return { ...state, token: action.payload.token };
      break;
    case Actions.SET_USER:
      if (!action.payload.user) return { ...state, token: "", user: null };
      return { ...state, user: action.payload.user };
    default:
      return state;
  }
};
