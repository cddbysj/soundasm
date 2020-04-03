import { combineReducers } from "redux";
import works from "./works";
import tags from "./tags";
import authors from "./authors";
import authorProfile from "./authorProfile";

const reducer = combineReducers({
  works,
  tags,
  authors,
  authorProfile
});

export default reducer;
