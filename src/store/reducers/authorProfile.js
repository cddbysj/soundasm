import {
  ADD_AUTHOR_PROFILE,
  ADD_AUTHOR_PROFILE_FAIL,
  ADD_AUTHOR_PROFILE_DONE,
  FETCH_AUTHOR_PROFILE,
  FETCH_AUTHOR_PROFILE_FAIL,
  FETCH_AUTHOR_PROFILE_DONE
} from "store/actionTypes";

const authorProfile = (
  state = { isFetching: false, error: null, profile: null },
  action
) => {
  const { type, payload = {} } = action;
  const { error, profile, isFetching } = payload;
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
    default:
      return state;
  }
};

export default authorProfile;
