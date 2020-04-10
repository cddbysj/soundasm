// 针对作品的过滤器
import { SET_VISIBILITY_FILTER } from "store/actionTypes";

const initialState = {
  author: "野上菜月",
  // rating: "",
  language: "",
  tag: "",
};

const visibilityFilter = (state = initialState, action) => {
  const { type, payload = {} } = action;
  const { filter } = payload;

  switch (type) {
    case SET_VISIBILITY_FILTER:
      return { ...state, ...filter };

    default:
      return state;
  }
};

export default visibilityFilter;
