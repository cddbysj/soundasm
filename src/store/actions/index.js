import {
  FETCH_WORKS,
  FETCH_WORKS_DONE,
  FETCH_WORKS_FAIL,
  FETCH_TODOS,
  FETCH_TODOS_DONE,
  FETCH_TODOS_FAILED,
  ADD_TODO
} from "../actionTypes";
import { audioRef, todosRef } from "../../api";

export const fetchWorks = () => dispatch => {
  dispatch({ type: FETCH_WORKS });
  const works = [];
  audioRef
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => works.push(doc.data()));
      dispatch({
        type: FETCH_WORKS_DONE,
        works
      });
    })
    .catch(error => dispatch({ type: FETCH_WORKS_FAIL, error }));
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
