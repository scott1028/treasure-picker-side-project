// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import _ from 'lodash';
import faker from 'faker/locale/zh_TW';

export default (req, res) => {
  const users = _.chain(6)
    .range()
    .map(idx => ({
      id: _.chain(idx).add(1),
      userName: `${faker.name.lastName()}${faker.name.firstName()}`,
      color: require('faker').internet.color(),
    }))
    .value();
  res.status(200).json(users);
}
