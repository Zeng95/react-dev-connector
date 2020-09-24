module.exports = {
  extends: 'stylelint-config-standard',
  plugins: 'stylelint-order',
  rules: {
    'at-rule-no-unknown': [true, { ignoreAtRules: ['tailwind'] }],
    'no-empty-source': null
  }
}
