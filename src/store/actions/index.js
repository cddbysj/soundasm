import {
  FETCH_WORKS,
  FETCH_WORKS_DONE,
  FETCH_WORKS_FAIL,
  FETCH_TODOS,
  FETCH_TODOS_DONE,
  FETCH_TODOS_FAILED,
  ADD_TODO,
  ADD_WORK,
  ADD_WORK_DONE,
  ADD_WORK_FAIL
} from "../actionTypes";
import { todosRef, worksRef } from "api";

export const fetchWorks = () => async dispatch => {
  dispatch({
    type: FETCH_WORKS,
    payload: {
      isFetching: true,
      error: null
    }
  });

  const items = [];
  try {
    const querySnapshot = await worksRef.get();
    querySnapshot.forEach(doc => items.push(doc.data()));
    dispatch({
      type: FETCH_WORKS_DONE,
      payload: {
        isFetching: false,
        error: null,
        items
      }
    });
  } catch (error) {
    dispatch({
      type: FETCH_WORKS_FAIL,
      payload: { isFetching: false, error }
    });
  }
};

export const fetchTodos = () => async dispatch => {
  dispatch({
    type: FETCH_TODOS,
    payload: {
      isFetching: true
    }
  });
  const items = [];
  try {
    const querySnapshot = await todosRef.get();
    querySnapshot.forEach(doc => items.push({ ...doc.data(), id: doc.id }));
    dispatch({
      type: FETCH_TODOS_DONE,
      payload: {
        isFetching: false,
        items
      }
    });
  } catch (error) {
    dispatch({
      type: FETCH_TODOS_FAILED,
      payload: {
        isFetching: false,
        error
      }
    });
  }
};

export const addTodo = text => async dispatch => {
  const todo = {
    completed: false,
    text
  };
  const { id } = await todosRef.add(todo);
  dispatch({
    type: ADD_TODO,
    payload: {
      text,
      id
    }
  });
};

export const addWork = work => async dispatch => {
  dispatch({
    type: ADD_WORK,
    payload: {}
  });
  try {
    await worksRef.add(work);
    dispatch({
      type: ADD_WORK_DONE,
      payload: { work }
    });
  } catch (error) {
    dispatch({
      type: ADD_WORK_FAIL,
      payload: { error }
    });
  }
};
