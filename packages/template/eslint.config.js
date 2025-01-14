import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  isInEditor: true,

  rules: {
    'sort-imports': 'off',
    'import/order': 'off',
  },
})
