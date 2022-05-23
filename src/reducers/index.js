import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import miniCartReducer from "./miniCartReducer";

const rootReducers = () =>
  combineReducers({ userReducer, authReducer, miniCartReducer });
export default rootReducers;
