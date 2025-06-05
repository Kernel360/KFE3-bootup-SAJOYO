import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 기본 권장 설정
  js.configs.recommended,

  // Next.js 설정 (자동으로 대부분 규칙 처리)
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // 최소한의 추가 규칙만
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      // ===== 핵심 안전성 규칙만 =====

      // 기본 품질
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'prefer-const': 'error',

      // React 필수
      'react/jsx-key': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript 필수 (Next.js가 대부분 처리)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // Prettier (맨 마지막)
  eslintConfigPrettier,
];

export default eslintConfig;
