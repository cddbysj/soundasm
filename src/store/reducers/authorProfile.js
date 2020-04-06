import {
  ADD_AUTHOR_PROFILE,
  ADD_AUTHOR_PROFILE_FAIL,
  ADD_AUTHOR_PROFILE_DONE,
  FETCH_AUTHOR_PROFILE,
  FETCH_AUTHOR_PROFILE_FAIL,
  FETCH_AUTHOR_PROFILE_DONE,
  FETCH_AUTHOR_PROFILES,
  FETCH_AUTHOR_PROFILES_FAIL,
  FETCH_AUTHOR_PROFILES_DONE,
  UPLOAD_AVATAR,
  UPLOAD_AVATAR_FAIL,
  UPLOAD_AVATAR_DONE,
} from 'store/actionTypes';

const authorProfile = (
  state = { isFetching: false, error: null, profile: null },
  action
) => {
  const { type, payload = {} } = action;
  const {
    error,
    profile /* 作者档案 */,
    profiles,
    isFetching,
    downloadURL /* 头像的地址 */,
    progress /* 头像上传进度 */,
  } = payload;
  switch (type) {
    case ADD_AUTHOR_PROFILE:
      return state;
    case ADD_AUTHOR_PROFILE_FAIL:
      return { ...state, error };
    case ADD_AUTHOR_PROFILE_DONE:
      return { ...state, profile };
    case FETCH_AUTHOR_PROFILE:
      return { ...state, isFetching };
    case FETCH_AUTHOR_PROFILE_FAIL:
      return { ...state, isFetching, error };
    case FETCH_AUTHOR_PROFILE_DONE:
      return { ...state, isFetching, profile };
    case FETCH_AUTHOR_PROFILES:
      return { ...state, isFetching };
    case FETCH_AUTHOR_PROFILES_FAIL:
      return { ...state, isFetching, error };
    case FETCH_AUTHOR_PROFILES_DONE:
      return { ...state, isFetching, profiles };
    case UPLOAD_AVATAR:
      return { ...state, progress };
    case UPLOAD_AVATAR_FAIL:
      return { ...state, progress, error };
    case UPLOAD_AVATAR_DONE:
      return { ...state, progress, downloadURL };
    default:
      return state;
  }
};

export default authorProfile;
