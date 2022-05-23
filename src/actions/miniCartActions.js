import { createAction } from "./actionCreator";
import { MINICART_TYPES } from "./types";

export const setMiniCart = createAction(MINICART_TYPES.SET_CART);
export const clearMiniCart = createAction(MINICART_TYPES.CLEAR_CART);
