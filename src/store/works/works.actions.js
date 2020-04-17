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
import { worksRef } from "api";

// 检查某个作品是否已经存在
export const checkWorkExists = (work) => async (dispatch) => {
  let exists = false;
  let emptys = [];
  const { rj, title } = work;

  if (rj) {
    emptys = await Promise.all([
      (await worksRef.where("rj", "==", rj).get()).empty,
      (await worksRef.where("title", "==", title).get()).empty,
    ]);
  } else {
    emptys = [(await worksRef.where("title", "==", title).get()).empty];
  }

  emptys.forEach((empty) => {
    if (!empty) exists = true;
  });

  dispatch({
    type: CHECK_WORK_EXISTS,
    payload: { exists },
  });
  return exists;
};

// works 作品
export const fetchWorks = () => async (dispatch) => {
  dispatch({
    type: FETCH_WORKS,
    payload: {
      isFetching: true,
      error: null,
    },
  });

  const items = [];
  try {
    const querySnapshot = await worksRef.orderBy("editAt", "desc").get();
    querySnapshot.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
    dispatch({
      type: FETCH_WORKS_DONE,
      payload: {
        isFetching: false,
        error: null,
        items,
      },
    });
  } catch (error) {
    dispatch({
      type: FETCH_WORKS_FAIL,
      payload: { isFetching: false, error },
    });
  }
};

export const addWork = (work) => async (dispatch) => {
  dispatch({
    type: ADD_WORK,
    payload: { error: null },
  });
  try {
    await worksRef.add(work);
    dispatch({
      type: ADD_WORK_DONE,
      payload: { work },
    });
  } catch (error) {
    dispatch({
      type: ADD_WORK_FAIL,
      payload: { error },
    });
  }
};
export const updateWork = (work) => async (dispatch) => {
  dispatch({
    type: UPDATE_WORK,
    payload: { error: null },
  });
  try {
    await worksRef.doc(work.id).update(work);
    dispatch({
      type: UPDATE_WORK_DONE,
      payload: { work },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_WORK_FAIL,
      payload: { error },
    });
  }
};
