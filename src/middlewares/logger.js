import _ from 'lodash';

import {
  ACTIVE,
  INACTIVE,
} from '../lib';
import {
  SET_TIME,
  UNSET_TIME,
  CHECK_TERMINATE,
} from '../lib/actions';
import {
  getLogger
} from '../lib/logger';

const logger = getLogger();

export const loggerMiddleware = ({ getState }) => {
  return next => action => {
    logger.DEBUG('will dispatch', action);
    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);
    logger.DEBUG('state after dispatch/store:', JSON.stringify(getState(), null, 2));
    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  }
}
