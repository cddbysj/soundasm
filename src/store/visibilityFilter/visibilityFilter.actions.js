import { SET_VISIBILITY_FILTER } from "store/visibilityFilter/visibilityFilter.actionTypes";

// 作品过滤器
export const setVisibilityFilter = (filter) => async (dispatch) => {
  dispatch({
    type: SET_VISIBILITY_FILTER,
    payload: {
      filter,
    },
  });
};
