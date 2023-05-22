const path = require('path');

module.exports = function override(config, env) {
  // Add the fallback configuration
  config.resolve.fallback = {
    ...config.resolve.fallback,
    url: require.resolve('url/'),
  };

  return config;
};
