module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm --filter @mengche/site preview --host 127.0.0.1 --port 4173',
      startServerReadyPattern: 'Local:',
      startServerReadyTimeout: 120000,
      numberOfRuns: 1,
      url: [
        'http://127.0.0.1:4173/en',
        'http://127.0.0.1:4173/en/services',
        'http://127.0.0.1:4173/en/projects',
        'http://127.0.0.1:4173/en/projects/ping-board',
        'http://127.0.0.1:4173/en/about',
        'http://127.0.0.1:4173/en/contact',
        'http://127.0.0.1:4173/en/privacy',
        'http://127.0.0.1:4173/zh-tw'
      ]
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'image-size-responsive': 'error',
        'unsized-images': 'error'
      }
    },
    upload: { target: 'temporary-public-storage' }
  }
};
