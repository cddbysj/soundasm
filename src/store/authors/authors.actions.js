import { authorsRef } from "api";
import {
  ADD_AUTHORS,
  ADD_AUTHORS_FAIL,
  ADD_AUTHORS_DONE,
  FETCH_AUTHORS_DONE,
  FETCH_AUTHORS,
  FETCH_AUTHORS_FAIL,
} from "store/authors/authors.actionTypes";

// 只获取作者名字列表，不包含作者其他信息
export const fetchAuthors = () => async (dispatch) => {
  dispatch({
    type: FETCH_AUTHORS,
    payload: { isFetching: true, error: null, authorItems: {} },
  });

  try {
    const authorsDoc = await authorsRef.doc("all").get();
    const authorItems = authorsDoc.data();

    dispatch({
      type: FETCH_AUTHORS_DONE,
      payload: { isFetching: false, error: null, authorItems },
    });
  } catch (error) {
    dispatch({
      type: FETCH_AUTHORS_FAIL,
      payload: { isFetching: false, error },
    });
  }
};

export const addAuthors = (newAuthors) => async (dispatch) => {
  dispatch({
    type: ADD_AUTHORS,
    payload: { error: null },
  });

  try {
    const updatedData = {};
    Array.isArray(newAuthors)
      ? newAuthors.forEach((author) => (updatedData[author] = author))
      : (updatedData[newAuthors] = newAuthors);
    await authorsRef.doc("all").set(updatedData, { merge: true });
    dispatch({
      type: ADD_AUTHORS_DONE,
      payload: { newAuthors: updatedData },
    });
  } catch (error) {
    dispatch({
      type: ADD_AUTHORS_FAIL,
      payload: { error },
    });
  }
};
