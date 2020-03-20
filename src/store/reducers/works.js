import {
  FETCH_WORKS,
  FETCH_WORKS_FAIL,
  FETCH_WORKS_DONE
} from "../actionTypes";

const works = (state = null, action) => {
  switch (action.type) {
    case FETCH_WORKS_FAIL:
      return action.error;
    case FETCH_WORKS_DONE:
      return action.works;
    case FETCH_WORKS:
    default:
      return state;
  }
};

export default works;
