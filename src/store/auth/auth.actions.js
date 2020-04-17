import { auth } from "api";
import {
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  SIGN_IN,
  SIGN_IN_FAILED,
  SIGN_IN_DONE,
  SIGN_OUT,
  SIGN_OUT_FAILED,
  SIGN_OUT_DONE,
} from "./auth.actionTypes";

// 用户身份验证
// 使用观察者监听用户身份状态
export const setCurrentUser = () => async (dispatch) => {
  const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
    user
      ? dispatch({
          type: SET_CURRENT_USER,
          payload: {
            currentUser: {
              email: user.email,
              uid: user.uid,
            },
          },
        })
      : dispatch({
          type: CLEAR_CURRENT_USER,
          payload: {
            currentUser: null,
          },
        });
  });

  return unsubscribeFromAuth;
};

// 用户登录
export const signIn = (email, password) => async (dispatch) => {
  dispatch({
    type: SIGN_IN,
    payload: { error: null },
  });
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({
      type: SIGN_IN_DONE,
      payload: { error: null },
    });
  } catch (error) {
    dispatch({
      type: SIGN_IN_FAILED,
      payload: { error },
    });
  }
};

export const signOut = () => async (dispatch) => {
  dispatch({
    type: SIGN_OUT,
    payload: { error: null },
  });
  try {
    await auth.signOut();
    dispatch({
      type: SIGN_OUT_DONE,
      payload: { error: null },
    });
  } catch (error) {
    dispatch({
      type: SIGN_OUT_FAILED,
      payload: { error },
    });
  }
};
