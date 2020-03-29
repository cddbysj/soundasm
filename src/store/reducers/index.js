import { combineReducers } from 'redux';
import works from './works';
import tags from './tags';
import authors from './authors';

const reducer = combineReducers({
  works,
  tags,
  authors,
});

export default reducer;
