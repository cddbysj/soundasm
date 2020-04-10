import { combineReducers } from "redux";
import works from "./works";
import tags from "./tags";
import authors from "./authors";
import authorProfile from "./authorProfile";
import visibilityFilter from "./visibilityFilter";

const reducer = combineReducers({
  works,
  tags,
  authors,
  authorProfile,
  visibilityFilter,
});

export default reducer;
