import {
  FETCH_WORKS,
  FETCH_WORKS_FAIL,
  FETCH_WORKS_DONE,
  ADD_WORK,
  ADD_WORK_DONE,
  ADD_WORK_FAIL,
  UPDATE_WORK,
  UPDATE_WORK_FAIL,
  UPDATE_WORK_DONE,
  CHECK_WORK_EXISTS,
} from "store/works/works.actionTypes";

const initialState = {
  error: null,
  isFetching: false,
  items: [],
};

const works = (state = initialState, action) => {
  const { type, payload = {} } = action;
  const { error, isFetching, items, work, exists } = payload;
  switch (type) {
    case FETCH_WORKS_FAIL:
      return { ...state, isFetching, error };
    case FETCH_WORKS_DONE:
      return { ...state, isFetching, items };
    case FETCH_WORKS:
      return { ...state, isFetching };
    case CHECK_WORK_EXISTS:
      return { ...state, exists };
    case ADD_WORK:
      return { ...state };
    case ADD_WORK_FAIL:
      return { ...state, error };
    case ADD_WORK_DONE:
      return { ...state, items: [work, ...state.items], error };
    case UPDATE_WORK:
      return { ...state, error };
    case UPDATE_WORK_FAIL:
      return { ...state, error };
    case UPDATE_WORK_DONE:
      return {
        ...state,
        items: [
          ...state.items.map((item) => (item.id === work.id ? work : item)),
        ],
      };
    default:
      return state;
  }
};

export default works;
