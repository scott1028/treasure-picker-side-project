import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import _, { get } from 'lodash';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import {
  getMillionsecondsFromMinutes,
  isBrowserMode,
  isNonProductionMode,
  ACTIVE,
  INACTIVE,
} from './lib';
import {
  TICK,
  SET_TIME,
  UNSET_TIME,
  CHECK_TERMINATE,
} from './lib/actions';

// create your reducer
const reducer = (state = { tick: 'init' }, action) => {
  switch (action?.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      // NOTE: dispatch inside getStaticProps/getServerSideProps
      return { ...state, ...action?.payload };
    case TICK:
      return { ...state, tick: action?.payload };
    default:
      return state;
  }
};

const timerReducer = (state = { value: null, modalStatus: ACTIVE }, action) => {
  const now = Date.now();
  switch (action?.type) {
    case SET_TIME:
      return {
        ...state,
        value: now + getMillionsecondsFromMinutes(action?.payload?.value),
        modalStatus: ACTIVE,
      };
    case UNSET_TIME:
      return {
        ...state,
        value: null,
        modalStatus: INACTIVE,
      };
    case CHECK_TERMINATE:
      const value = _.chain(state).get('value').value();
      const endTimestamp = _.chain(value).parseInt().value();
      if (now >= endTimestamp && value !== null) {
        return {
          ...state,
          value: null,
        }
      }
      return { ...state };
    default:
      return state;
  }
};

function logger({ getState }) {
  return next => action => {
    console.log('will dispatch', action)
    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)
    console.log('state after dispatch/store:', JSON.stringify(getState(), null, 2))
    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

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
        logger,
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
