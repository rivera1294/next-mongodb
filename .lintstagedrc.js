const {
  CLIEngine,
  // ESLint,
} = require('eslint')

const cli = new CLIEngine({})

module.exports = {
  '*.{js,jsx,ts,tsx}': (files) =>
    'eslint --max-warnings=0 ' + files.filter((file) => !cli.isPathIgnored(file)).join(' '),
}
