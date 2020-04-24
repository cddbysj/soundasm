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
  ALL_WORKS_LOADED,
} from "store/works/works.actionTypes";

const initialState = {
  error: null,
  isFetching: false,
  items: [],
  allWorksLoaded: false,
  isOperating: false,
};

const works = (state = initialState, action) => {
  const { type, payload = {} } = action;
  const {
    error,
    isFetching,
    items,
    isOperating,
    work,
    exists,
    allWorksLoaded,
  } = payload;
  switch (type) {
    case FETCH_WORKS_FAIL:
      return { ...state, isFetching, error };
    case FETCH_WORKS_DONE:
      return { ...state, isFetching, items };
    case FETCH_WORKS:
      return { ...state, isFetching };
    case CHECK_WORK_EXISTS:
      return { ...state, exists };
    case ALL_WORKS_LOADED:
      return { ...state, allWorksLoaded };
    case ADD_WORK:
      return { ...state, isOperating };
    case ADD_WORK_FAIL:
      return { ...state, error, isOperating };
    case ADD_WORK_DONE:
      return { ...state, items: [work, ...state.items], error, isOperating };
    case UPDATE_WORK:
      return { ...state, error, isOperating };
    case UPDATE_WORK_FAIL:
      return { ...state, error, isOperating };
    case UPDATE_WORK_DONE:
      return {
        ...state,
        items: [
          ...state.items.map((item) => (item.id === work.id ? work : item)),
        ],
        isOperating,
      };
    default:
      return state;
  }
};

export default works;
