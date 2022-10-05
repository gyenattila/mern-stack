const setupEnvironmentVariables = () => {
  /** Read environment variables from json file. */
  const ENV = require('../env.json');

  process.env.API_KEY = ENV.API_KEY;
};

exports.config = setupEnvironmentVariables;
