import { combineReducers } from "redux";
import works from "./works";
import todos from "./todos";

const reducer = combineReducers({
  works,
  todos
});

export default reducer;
