import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['packages/**/*.test.ts', 'apps/inquiry-worker/**/*.test.ts'],
		exclude: ['**/node_modules/**', '**/build/**', '**/.svelte-kit/**']
	}
});
