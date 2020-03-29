import {
  FETCH_WORKS,
  FETCH_WORKS_FAIL,
  FETCH_WORKS_DONE,
  ADD_WORK,
} from '../actionTypes';

const initialState = {
  error: null,
  isFetching: false,
  items: [],
};

const works = (state = initialState, action) => {
  const { type, payload = {} } = action;
  const { error, isFetching, items, work } = payload;
  switch (type) {
    case FETCH_WORKS_FAIL:
      return { ...state, isFetching, error };
    case FETCH_WORKS_DONE:
      return { ...state, isFetching, items };
    case FETCH_WORKS:
      return { ...state, isFetching };
    case ADD_WORK:
      return { ...state, items: [work, ...state.items] };
    default:
      return state;
  }
};

export default works;
