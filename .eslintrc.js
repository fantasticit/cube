const config = require('@fantasticit/code-lint/lib/config/eslint')();

// Here you can modify `config` as needed.
config.rules['react/jsx-no-bind'] = 0;
config.rules['import/no-unresolved'] = 1;
module.exports = config;
