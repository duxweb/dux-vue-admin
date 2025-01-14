import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  isInEditor: true,
  rules: {
    'perfectionist/sort-exports': 'off',
    'perfectionist/sort-named-exports': 'off',
  },
  ignores: ['packages/lib/src/components/index.ts'],
})
