import prettier from 'eslint-config-prettier';
import path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
  {
    ignores: [
      'src/**',
      'static/**',
      'svelte.config.js',
      'svelte-sitemap.config.ts',
      'vite.config.ts',
      'apps/site/src/lib/paraglide/**',
      'apps/inquiry-worker/worker-configuration.d.ts'
    ]
  },
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.worker }
    },
    rules: {
      'no-undef': 'off'
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        extraFileExtensions: ['.svelte'],
        parser: ts.parser
      }
    },
    rules: {
      'svelte/no-navigation-without-resolve': ['error', { ignoreLinks: true }]
    }
  }
);
