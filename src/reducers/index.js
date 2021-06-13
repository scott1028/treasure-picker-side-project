import _ from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

import {
  getMillionsecondsFromMinutes,
} from '../lib';
import {
  TICK,
  SET_TIME,
  UNSET_TIME,
  CHECK_OR_UPDATE_TERMINATE,
} from '../lib/actions';

export const reducer = (state = { tick: 'init' }, action) => {
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
