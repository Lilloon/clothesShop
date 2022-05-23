import { USER_TYPES } from "../actions/types";

const defaultState = {
  user: {
    address: "",
    date_of_birth: "",
    first_name: "",
    id_client: "",
    is_employer: false,
    middle_name: "",
    password: "",
    phone_number: "",
    second_name: "",
  },
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case USER_TYPES.SET_USER:
      return { ...state, user: action?.$payload };
    case USER_TYPES.CLEAR_USER:
      return { ...state, user: defaultState.user };
    default:
      return state;
  }
};

export default userReducer;
