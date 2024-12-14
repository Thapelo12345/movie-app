import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = { itemId: '1' };
const initialSearch = { searchFor : 'All' }
const initialTitle = { movieTitle : ''}

const findTitleReducer = (state = initialTitle, action) =>{
switch (action.type) {
  case 'MOVE_TITLE':
    return {...state, movieTitle: action.input}
  default:
    return state
}
}//end of move title reducer

const searchReducer = (state = initialSearch, action) => {
  switch (action.type) {
    case 'SEARCH_FOR':
      return { ...state, searchFor: action.input };
    default:
      return state
  }
}//end of seach reducer

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_INPUT':
      return { ...state, itemId: action.input };
    default:
      return state;
  }
}//end of item reducer

const rootReducer = combineReducers({
  item: itemReducer,
  search: searchReducer,
  title: findTitleReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };