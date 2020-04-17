import { combineReducers } from "redux";
import auth from "store/auth/auth.reducer";
import works from "store/works/works.reducer";
import tags from "store/tags/tags.reducer";
import authors from "store/authors/authors.reducer";
import authorProfile from "store/authorProfile/authorProfile.reducer";
import comments from "store/comments/comments.reducer";
import visibilityFilter from "store/visibilityFilter/visibilityFilter.reducer";

const reducer = combineReducers({
  auth,
  works,
  tags,
  authors,
  authorProfile,
  comments,
  visibilityFilter,
});

export default reducer;
