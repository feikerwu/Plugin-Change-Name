const PluginChangeName = require('../src/index.js').default;

module.exports = function override(config, env) {
  config.plugins.unshift(
    new PluginChangeName({
      format: (filename) => `offline-${filename}`,
    })
  );
  return config;
};
