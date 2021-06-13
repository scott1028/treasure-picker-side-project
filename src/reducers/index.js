import _ from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

import {
  ACTIVE,
  INACTIVE,
  getMillionsecondsFromMinutes,
} from '../lib';
import {
  TICK,
  SET_TIME,
  UNSET_TIME,
  CHECK_TERMINATE,
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

export const timerReducer = (state = { value: null, modalStatus: ACTIVE }, action) => {
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
