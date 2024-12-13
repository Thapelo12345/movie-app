import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = { itemId: '1' };
const initialLoad = { dataRecived : false}

const dataReducer = (state = initialLoad, action) => {
  switch (action.type) {
    case 'DATA_RECEIVED':
      return { ...state, dataReceived: true };
    default:
      return state;
  }
};


const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_INPUT':
      return { ...state, itemId: action.input };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  item: itemReducer,
  LoadedData: dataReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };


/*import { createStore } from 'redux'

const initialState = { itemId: '0' }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_INPUT':
            return { ...state, itemId: action.input }
        default:
            return state
    }
}

const store = createStore(reducer)

export default store
*/