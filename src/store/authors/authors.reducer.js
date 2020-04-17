import {
  ADD_AUTHORS,
  ADD_AUTHORS_FAIL,
  ADD_AUTHORS_DONE,
  FETCH_AUTHORS_DONE,
  FETCH_AUTHORS,
  FETCH_AUTHORS_FAIL,
} from "store/authors/authors.actionTypes";

const authors = (
  state = { isFetching: false, error: null, authorItems: {} },
  action
) => {
  const { type, payload = {} } = action;
  const { isFetching, error, newAuthors, authorItems } = payload;
  switch (type) {
    case FETCH_AUTHORS:
      return { ...state, isFetching, error };
    case FETCH_AUTHORS_FAIL:
      return { ...state, isFetching, error };
    case FETCH_AUTHORS_DONE:
      return { ...state, isFetching, error, authorItems };
    case ADD_AUTHORS:
      return { ...state, error };
    case ADD_AUTHORS_DONE:
      return {
        ...state,
        authorItems: { ...state.authorItems, ...newAuthors },
        error,
      };
    case ADD_AUTHORS_FAIL:
      return { ...state, error };
    default:
      return state;
  }
};

export default authors;
