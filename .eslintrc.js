const config = require('@fantasticit/code-lint/lib/config/eslint')();

// Here you can modify `config` as needed.
config.rules['react/jsx-no-bind'] = 0;
config.rules['import/no-unresolved'] = 1;
config.rules['@typescript-eslint/no-unused-vars'] = 0;
module.exports = config;
