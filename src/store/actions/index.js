import {
  FETCH_WORKS,
  FETCH_WORKS_DONE,
  FETCH_WORKS_FAIL,
  SET_VISIBILITY_FILTER,
  CHECK_WORK_EXISTS,
  ADD_WORK,
  ADD_WORK_DONE,
  ADD_WORK_FAIL,
  FETCH_TAGS,
  FETCH_TAGS_FAIL,
  FETCH_TAGS_DONE,
  ADD_TAGS,
  ADD_TAGS_DONE,
  ADD_TAGS_FAIL,
  REMOVE_TAG,
  REMOVE_TAG_DONE,
  REMOVE_TAG_FAIL,
  ADD_AUTHORS,
  ADD_AUTHORS_DONE,
  ADD_AUTHORS_FAIL,
  FETCH_AUTHORS,
  FETCH_AUTHORS_FAIL,
  FETCH_AUTHORS_DONE,
  UPDATE_WORK,
  UPDATE_WORK_DONE,
  UPDATE_WORK_FAIL,
  ADD_AUTHOR_PROFILE,
  ADD_AUTHOR_PROFILE_FAIL,
  ADD_AUTHOR_PROFILE_DONE,
  UPLOAD_AVATAR,
  UPLOAD_AVATAR_FAIL,
  UPLOAD_AVATAR_DONE,
  FETCH_AUTHOR_PROFILE,
  FETCH_AUTHOR_PROFILE_FAIL,
  FETCH_AUTHOR_PROFILE_DONE,
  FETCH_AUTHOR_PROFILES,
  FETCH_AUTHOR_PROFILES_FAIL,
  FETCH_AUTHOR_PROFILES_DONE,
} from "../actionTypes";
import {
  worksRef,
  tagsRef,
  authorsRef,
  deleteField,
  storageRef,
  storage,
} from "api";

// 检查某个作品是否已经存在
export const checkWorkExists = (work) => async (dispatch) => {
  let exists = false;
  const { rj } = work;
  console.log("check work is exists", rj);
  if (!rj) {
    dispatch({
      type: CHECK_WORK_EXISTS,
      payload: { exists: false },
    });
    return false;
  }
  const querySnapshot = await worksRef.where("rj", "==", rj).get();
  querySnapshot.forEach((doc) => {
    if (doc.exists) {
      exists = true;
    }
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

// authors 作者
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

// author profile 作者档案
export const addAuthorProfile = (profile) => async (dispatch) => {
  dispatch({
    type: ADD_AUTHOR_PROFILE,
    payload: { error: null },
  });

  try {
    await authorsRef.doc(`${profile.name}`).set(profile, { merge: true });
    dispatch({
      type: ADD_AUTHOR_PROFILE_DONE,
      payload: { error: null, profile },
    });
  } catch (error) {
    dispatch({
      type: ADD_AUTHOR_PROFILE_FAIL,
      payload: { error },
    });
  }
};

export const fetchAuthorProfile = (authorName) => async (dispatch) => {
  dispatch({
    type: FETCH_AUTHOR_PROFILE,
    payload: { isFetching: true, error: null },
  });

  try {
    const profileData = await authorsRef.doc(authorName).get();
    const profile = profileData.data();
    dispatch({
      type: FETCH_AUTHOR_PROFILE_DONE,
      payload: { isFetching: false, error: null, profile },
    });
  } catch (error) {
    dispatch({
      type: FETCH_AUTHOR_PROFILE_FAIL,
      payload: { isFetching: false, error },
    });
  }
};

export const fetchAuthorProfiles = () => async (dispatch) => {
  dispatch({
    type: FETCH_AUTHOR_PROFILES,
    payload: { isFetching: true, error: null },
  });

  try {
    const profilesData = await authorsRef.get();
    const profiles = {};
    profilesData.forEach((doc) => {
      const key = doc.data().name || "all";
      profiles[key] = doc.data();
    });
    dispatch({
      type: FETCH_AUTHOR_PROFILES_DONE,
      payload: { isFetching: false, error: null, profiles },
    });
  } catch (error) {
    dispatch({
      type: FETCH_AUTHOR_PROFILES_FAIL,
      payload: { isFetching: false, error },
    });
  }
};

// 作品过滤器
export const setVisibilityFilter = (filter) => async (dispatch) => {
  dispatch({
    type: SET_VISIBILITY_FILTER,
    payload: {
      filter,
    },
  });
};

// 上传头像
export const uploadAvatar = ({
  file,
  onProgress,
  onError,
  onSuccess,
}) => async (dispatch) => {
  // Create the file metadata
  const metadata = {
    contentType: "image/jpeg",
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const uploadTask = storageRef
    .child("images/" + file.name)
    .put(file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function (snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress({ precent: progress }, file);
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          dispatch({
            type: UPLOAD_AVATAR,
            payload: { progress },
          });
          break;
        default:
          dispatch({
            type: UPLOAD_AVATAR,
            payload: { progress },
          });
          return;
      }
    },
    function (error) {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          dispatch({
            type: UPLOAD_AVATAR_FAIL,
            payload: { error: "存储错误：未获得授权" },
          });
          break;

        case "storage/canceled":
          // User canceled the upload
          dispatch({
            type: UPLOAD_AVATAR_FAIL,
            payload: { error: "存储错误：上传被取消" },
          });
          break;

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          dispatch({
            type: UPLOAD_AVATAR_FAIL,
            payload: { error: "存储错误：未知" },
          });
          break;
        default:
          onError(error);
          dispatch({
            type: UPLOAD_AVATAR_FAIL,
            payload: { error: `存储错误：${error.code}` },
          });
          return;
      }
    },
    function () {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
        onSuccess({ downloadURL }, file);
        dispatch({
          type: UPLOAD_AVATAR_DONE,
          payload: { error: null, downloadURL },
        });
      });
    }
  );
};
