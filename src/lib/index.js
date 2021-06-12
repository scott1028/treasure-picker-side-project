import ReactDOM from 'react-dom';
import numeral from 'numeral';
import _ from 'lodash';
import fetch from 'node-fetch';

export const getMillionsecondsFromMinutes = value => _.chain(value).multiply(60 * 1000).value();
export const getMinutesGapFromMillionseconds = value => {
  const now = Date.now();
  return _.chain(value).defaultTo(now).subtract(now).divide(60 * 1000).defaultTo(0).value();
}
export const isBrowserMode = typeof window !== 'undefined';
export const isNonProductionMode = _.chain(process)
  .get('env.NODE_ENV')
  .isEqual('production')
  .thru(value => !value)
  .value();

export const getHumanReadableTimerBySecond = ({ value, formatter = value => value }) => {
  if(!value || +value <= 0) {
    return '-';
  }
  return _.chain(value)
    .thru(value => formatter(value))
    .parseInt()
    .thru(value => numeral(value).format('00:00:00'))
    .value();
}

const FETCH_TIMEOUT = 'fetch timeout';

export const fetchAPI = (...args) => {
  const timeout = _.chain(args)
    .thru(value =>
      _.chain(value)
      .get('0.#timeout')
      .defaultTo(_.chain(value).get('1.#timeout', 5000)).value())
    .value();
  return Promise.race([
    new Promise((res, rej) => setTimeout(() => rej(FETCH_TIMEOUT), timeout)),
    fetch(...args),
  ]);
}

export const showModal = ({
  component: Component = () => null,
  props = {},
} = {}) => new Promise(res => {
  const root = document.createElement('div');
  const onClosed = (flag = true) => {
    ReactDOM.unmountComponentAtNode(root);
    root.remove();
    res(flag);
  };
  const onCompleted = () => {
    onClosed(true);
  };
  document.body.appendChild(root);
  ReactDOM.render(<Component {...props} onClosed={() => onClosed(false)} onCompleted={onCompleted} />, root);
});

export const ACTIVE = 'ACTIVE';
export const INACTIVE = 'INACTIVE';
export const FRAME_GAP = 500;
export const INVALID_TIME_VALUE = '有效輸入範圍為整數 1 ~ 1440 分鐘!';
