import {
  FETCH_TAGS,
  FETCH_TAGS_FAIL,
  FETCH_TAGS_DONE,
  ADD_TAGS,
  ADD_TAGS_DONE,
  ADD_TAGS_FAIL,
  REMOVE_TAG,
  REMOVE_TAG_DONE,
  REMOVE_TAG_FAIL,
} from "store/tags/tags.actionTypes";
import { tagsRef, deleteField } from "api";

// tags 标签
export const fetchTags = () => async (dispatch) => {
  dispatch({
    type: FETCH_TAGS,
    payload: {
      isFetching: true,
      error: null,
    },
  });

  try {
    const tagsDoc = await tagsRef.doc("all").get();
    const tagItems = tagsDoc.data();
    dispatch({
      type: FETCH_TAGS_DONE,
      payload: {
        isFetching: false,
        error: null,
        tagItems,
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

export const addTags = (tags) => async (dispatch) => {
  dispatch({
    type: ADD_TAGS,
    payload: { error: null },
  });

  try {
    const data = {};
    tags.forEach((tag) => (data[tag] = tag));
    await tagsRef.doc("all").set(data, { merge: true });

    dispatch({
      type: ADD_TAGS_DONE,
      payload: { tags: data },
    });
  } catch (error) {
    dispatch({
      type: ADD_TAGS_FAIL,
      payload: { error },
    });
  }
};

export const removeTag = (tag) => async (dispatch) => {
  dispatch({
    type: REMOVE_TAG,
    payload: {},
  });

  try {
    await tagsRef.doc("all").update({ [tag]: deleteField() });
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
