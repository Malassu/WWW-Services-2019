import { combineReducers } from 'redux';
import auth from './auth';
import categories from './categories';
import items from './items';
import outfits from './outfits';
import wardrobes from './wardrobes';

const appReducer = combineReducers({
  auth, categories, items, outfits, wardrobes
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action)
}

export default rootReducer;