import {
  FETCH_TODOS,
  FETCH_TODOS_DONE,
  FETCH_TODOS_FAILED,
  ADD_TODO
} from "../actionTypes";

const initialState = {
  isFetching: false,
  error: null,
  items: []
};

const todos = (state = initialState, action) => {
  const { type, payload = {} } = action;
  const { items, text, id, error, isFetching } = payload;
  switch (type) {
    case FETCH_TODOS:
      return { ...state, isFetching };
    case FETCH_TODOS_DONE:
      return { ...state, isFetching, items };
    case FETCH_TODOS_FAILED:
      return { ...state, isFetching, error };
    case ADD_TODO:
      return {
        ...state,
        items: [{ completed: false, id, text }, ...state.items]
      };
    default:
      return state;
  }
};

export default todos;
