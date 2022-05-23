import { MINICART_TYPES } from "../actions/types";

const defaultState = {
  miniCart: {
    products: [],
    total_price: null,
    amount: "",
    id_bag: "",
    id_client: "",
  },
};

const miniCartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MINICART_TYPES.SET_CART:
      return { ...state, miniCart: action?.$payload };

    default:
      return state;
  }
};

export default miniCartReducer;
