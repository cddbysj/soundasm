import {
  FETCH_TAGS,
  FETCH_TAGS_DONE,
  FETCH_TAGS_FAIL,
  ADD_TAGS,
  ADD_TAGS_DONE,
  ADD_TAGS_FAIL,
} from 'store/actionTypes';

const tags = (
  state = { isFetching: false, error: null, items: [] },
  action
) => {
  const { type, payload = {} } = action;
  const { isFetching, error, items, tags } = payload;
  switch (type) {
    case FETCH_TAGS:
      return { ...state, isFetching };
    case FETCH_TAGS_DONE:
      return { ...state, isFetching, items };
    case FETCH_TAGS_FAIL:
      return { ...state, isFetching, error };
    case ADD_TAGS:
      return { ...state, error };
    case ADD_TAGS_DONE:
      return { ...state, items: [...tags, ...state.items], error };
    case ADD_TAGS_FAIL:
      return { ...state, items: [], error };
    default:
      return state;
  }
};

export default tags;
