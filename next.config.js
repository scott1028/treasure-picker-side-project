const dotenvFlow = require('dotenv-flow');

dotenvFlow.config();

module.exports = {
  env: {
    LOGGER_LEVEL: +process?.env?.LOGGER_LEVEL,
  },
}
