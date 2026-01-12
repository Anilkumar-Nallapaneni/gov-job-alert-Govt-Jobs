import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        globals: {
          window: 'readonly',
          document: 'readonly',
          console: 'readonly',
          HTMLElement: 'readonly',
          HTMLInputElement: 'readonly',
          HTMLSelectElement: 'readonly',
          HTMLDivElement: 'readonly',
          SVGPathElement: 'readonly',
          SVGSVGElement: 'readonly',
          Element: 'readonly',
          fetch: 'readonly',
          setTimeout: 'readonly',
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
