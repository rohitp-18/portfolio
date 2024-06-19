import { combineReducers } from "redux";
import { userReducer } from "./userReducers";
import { messageReducer } from "./messageReducer";

const reducer = combineReducers({
  user: userReducer,
  message: messageReducer,
});

export default reducer;
