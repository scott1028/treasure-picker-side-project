import _ from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

import {
  getMillionsecondsFromMinutes,
} from '../lib';
import {
  SET_TIME,
  UNSET_TIME,
  CHECK_OR_UPDATE_TERMINATE,
} from '../lib/actions';

export const reducer = (state = { tick: 'init' }, action) => {
  switch (action?.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      // NOTE: triggered once getStaticProps/getServerSideProps is dispatched by next.js
      return { ...state, ...action?.payload };
    default:
      return state;
  }
};

export const timerReducer = (state = { value: null }, action) => {
  const now = Date.now();
  switch (action?.type) {
    case SET_TIME:
      return {
        ...state,
        value: now + getMillionsecondsFromMinutes(action?.payload?.value),
      };
    case UNSET_TIME:
      return {
        ...state,
        value: null,
      };
    default:
      return state;
  }
};
