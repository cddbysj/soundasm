import {
  FETCH_WORKS,
  FETCH_WORKS_DONE,
  FETCH_WORKS_FAIL,
  ADD_WORK,
  ADD_WORK_DONE,
  ADD_WORK_FAIL,
  FETCH_TAGS,
  FETCH_TAGS_FAIL,
  FETCH_TAGS_DONE,
  ADD_TAGS,
  ADD_TAGS_DONE,
  REMOVE_TAG,
  ADD_TAGS_FAIL,
  REMOVE_TAG_DONE,
  REMOVE_TAG_FAIL,
  ADD_AUTHORS,
  ADD_AUTHORS_DONE,
  ADD_AUTHORS_FAIL,
  FETCH_AUTHORS,
  FETCH_AUTHORS_FAIL,
  FETCH_AUTHORS_DONE,
} from '../actionTypes';
import { worksRef, tagsRef, authorsRef, deleteField } from 'api';

// works
export const fetchWorks = () => async dispatch => {
  dispatch({
    type: FETCH_WORKS,
    payload: {
      isFetching: true,
      error: null,
    },
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

export const addWork = work => async dispatch => {
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

// tags
export const fetchTags = () => async dispatch => {
  dispatch({
    type: FETCH_TAGS,
    payload: {
      isFetching: true,
      error: null,
    },
  });

  try {
    const tagsDoc = await tagsRef.doc('all').get();
    const items = Object.keys(tagsDoc.data());
    dispatch({
      type: FETCH_TAGS_DONE,
      payload: {
        isFetching: false,
        error: null,
        items,
      },
    });
  } catch (error) {
    dispatch({
      type: FETCH_TAGS_FAIL,
      payload: {
        isFetching: false,
        error,
      },
    });
  }
};

export const addTags = tags => async dispatch => {
  dispatch({
    type: ADD_TAGS,
    payload: { error: null },
  });

  try {
    const updatedData = {};
    tags.forEach(tag => (updatedData[tag] = tag));
    await tagsRef.doc('all').update(updatedData);

    dispatch({
      type: ADD_TAGS_DONE,
      payload: { tags },
    });
  } catch (error) {
    dispatch({
      type: ADD_TAGS_FAIL,
      payload: { error },
    });
  }
};

export const removeTag = tag => async dispatch => {
  dispatch({
    type: REMOVE_TAG,
    payload: {},
  });

  try {
    await tagsRef.doc('all').update({ [tag]: deleteField() });
    dispatch({
      type: REMOVE_TAG_DONE,
      payload: { tag },
    });
  } catch (error) {
    dispatch({
      type: REMOVE_TAG_FAIL,
      payload: { error },
    });
  }
};

// authors
export const fetchAuthors = () => async dispatch => {
  dispatch({
    type: FETCH_AUTHORS,
    payload: { isFetching: true, error: null, items: [] },
  });

  try {
    const authorsDoc = await tagsRef.doc('all').get();
    const items = Object.keys(authorsDoc.data());

    dispatch({
      type: FETCH_AUTHORS_DONE,
      payload: { isFetching: false, error: null, items },
    });
  } catch (error) {
    dispatch({
      type: FETCH_AUTHORS_FAIL,
      payload: { isFetching: false, error },
    });
  }
};

export const addAuthors = authors => async dispatch => {
  dispatch({
    type: ADD_AUTHORS,
    payload: { error: null },
  });

  try {
    const updatedData = {};
    authors.forEach(author => (updatedData[author] = author));
    await tagsRef.doc('all').update(updatedData);

    dispatch({
      type: ADD_AUTHORS_DONE,
      payload: { authors },
    });
  } catch (error) {
    dispatch({
      type: ADD_AUTHORS_FAIL,
      payload: { error },
    });
  }
};
