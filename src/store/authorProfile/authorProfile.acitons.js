// author profile 作者档案
import {
  ADD_AUTHOR_PROFILE,
  ADD_AUTHOR_PROFILE_DONE,
  ADD_AUTHOR_PROFILE_FAIL,
  FETCH_AUTHOR_PROFILES,
  FETCH_AUTHOR_PROFILES_DONE,
  FETCH_AUTHOR_PROFILES_FAIL,
  UPLOAD_AVATAR,
  UPLOAD_AVATAR_FAIL,
  UPLOAD_AVATAR_DONE,
} from "store/authorProfile/authorProfile.actionTypes";
import { authorsRef, storage, storageRef } from "api";

// 新建或者编辑作者档案
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

// 获取所有作者档案
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
