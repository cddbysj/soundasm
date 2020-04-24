// 针对作品的过滤器
import { SET_VISIBILITY_FILTER } from "store/visibilityFilter/visibilityFilter.actionTypes";

const initialState = {
  author: null,
  rating: null,
  language: null,
  tag: null,
  rj: null,
  title: null,
  onlyShowWorksWithScript: false,
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
