import {
  ADD_AUTHORS,
  ADD_AUTHORS_FAIL,
  ADD_AUTHORS_DONE,
  FETCH_AUTHORS_DONE,
  FETCH_AUTHORS,
  FETCH_AUTHORS_FAIL,
} from '../actionTypes';

const authors = (
  state = { isFetching: false, error: null, items: [] },
  action
) => {
  const { type, payload = {} } = action;
  const { isFetching, error, authors, items } = payload;
  switch (type) {
    case FETCH_AUTHORS:
      return { ...state, isFetching, error };
    case FETCH_AUTHORS_FAIL:
      return { ...state, isFetching, error };
    case FETCH_AUTHORS_DONE:
      return { ...state, isFetching, error, items };
    case ADD_AUTHORS:
      return { ...state, error };
    case ADD_AUTHORS_DONE:
      return { ...state, items: [...authors, ...state.items], error };
    case ADD_AUTHORS_FAIL:
      return { ...state, error };
    default:
      return state;
  }
};

export default authors;
