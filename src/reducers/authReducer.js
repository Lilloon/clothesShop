import { AUTH_TYPES } from "../actions/types";

const defaultState = {
  isAuth: false,
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_TYPES.SET_IS_AUTH:
      return { ...state, isAuth: action?.$payload };

    default:
      return state;
  }
};

export default authReducer;
