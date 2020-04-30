import {
  FETCH_TAGS,
  FETCH_TAGS_DONE,
  FETCH_TAGS_FAIL,
  ADD_TAGS,
  ADD_TAGS_DONE,
  ADD_TAGS_FAIL
} from "store/tags/tags.actionTypes";

const tags = (
  state = { isFetching: false, error: null, tagItems: {} },
  action
) => {
  const { type, payload = {} } = action;
  const { isFetching, error, tagItems, tags } = payload;
  switch (type) {
    case FETCH_TAGS:
      return { ...state, isFetching };
    case FETCH_TAGS_DONE:
      return { ...state, isFetching, tagItems };
    case FETCH_TAGS_FAIL:
      return { ...state, isFetching, error };
    case ADD_TAGS:
      return { ...state, error };
    case ADD_TAGS_DONE:
      return { ...state, tagItems: { ...state.tagItems, ...tags }, error };
    case ADD_TAGS_FAIL:
      return { ...state, error };
    default:
      return state;
  }
};

export default tags;
