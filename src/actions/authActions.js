import { createAction } from "./actionCreator";
import { AUTH_TYPES } from "./types";

export const setIsAuth = createAction(AUTH_TYPES.SET_IS_AUTH);
