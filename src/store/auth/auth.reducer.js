import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from "./auth.actionTypes";

// 用户身份验证
const initialState = {
  currentUser: null,
};

const auth = (state = initialState, action) => {
  const { type, payload = {} } = action;
  const { currentUser } = payload;
  switch (type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser };
    case CLEAR_CURRENT_USER:
      return { ...state, currentUser };
    default:
      return state;
  }
};

export default auth;
