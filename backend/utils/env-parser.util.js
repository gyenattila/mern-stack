const setupEnvironmentVariables = () => {
  /** Read environment variables from json file. */
  const ENV_JSON = require('../env.json');

  process.env.API_KEY = ENV_JSON.API_KEY;
  process.env.MONGODB_URI = ENV_JSON.MONGODB_URI;
};

exports.config = setupEnvironmentVariables;
