import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'
import eslint from '@eslint/js'
import { globalIgnores } from 'eslint/config'

export default tseslint.config(
  globalIgnores(['./**/dist']),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  pluginReact.configs.flat['jsx-runtime'],
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/block-spacing': ['error'],
      '@stylistic/keyword-spacing': ['error', {
        before: true,
        after: true
      }],
      '@stylistic/arrow-spacing': ['error', {
        before: true,
        after: true
      }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/no-multiple-empty-lines': ['error', {
        max: 1,
        maxEOF: 0,
        maxBOF: 0
      }],
      '@stylistic/no-trailing-spaces': ['error', {
        'skipBlankLines': false
      }],
      '@stylistic/eol-last': ['error'],
      '@stylistic/no-multi-spaces': ['error', {
        exceptions: { 'Property': false },
        includeTabs: false
      }],
      '@typescript-eslint/consistent-type-definitions': ['off'],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
        { blankLine: 'always', prev: 'directive', next: 'import' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'multiline-const', next: '*' },
        { blankLine: 'always', prev: ['interface', 'type'], next: '*' },
        { blankLine: 'always', prev: '*', next: ['interface', 'type'] },
        { blankLine: 'always', prev: 'import', next: ['export'] },
        { blankLine: 'always', prev: 'import', next: ['const', 'let', 'type'] }
      ]
    }
  }
)
