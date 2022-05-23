import { createAction } from "./actionCreator";
import { USER_TYPES } from "./types";

export const setUser = createAction(USER_TYPES.SET_USER);
export const clearUser = createAction(USER_TYPES.CLEAR_USER);
