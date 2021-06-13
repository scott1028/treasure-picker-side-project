import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import {
  isBrowserMode,
  isNonProductionMode,
} from './lib';
import {
  loggerMiddleware,
} from './middlewares/logger';
import {
  reducer,
  timerReducer,
} from './reducers';

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const persistConfig = {
  key: 'root',
  storage: isBrowserMode ? createWebStorage('local') : createNoopStorage(),
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  root: reducer,
  timer: timerReducer,
}));

// create a makeStore function
const makeStore = context => {
  const store = createStore(
    persistedReducer,
    // preloadedState, // NOTE: you want put someting initially
    // NOTE: according to user's cookie/session to make different init state
    // {
    //   adminName: 'scott999',
    // },
    composeWithDevTools(
      applyMiddleware(...[
        loggerMiddleware,
        thunk,
      ]),
      // other store enhancers if any
    ));

  if (isBrowserMode) {
    store.__PERSISTOR = persistStore(store);
  }
  return store;
}

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {
  debug: isNonProductionMode,
});
