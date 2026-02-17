/**
 * Lighthouse CI Configuration
 * @see https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md
 */
module.exports = {
  ci: {
    collect: {
      // URLs to audit (FR homepage + key pages)
      url: [
        'http://localhost:3000/fr',
        'http://localhost:3000/fr/croisiere',
        'http://localhost:3000/fr/galerie',
        'http://localhost:3000/fr/actualites',
        'http://localhost:3000/fr/faq',
        // Landing pages (1 per tier)
        'http://localhost:3000/fr/evjf-seine',
        'http://localhost:3000/fr/team-building-seine',
        'http://localhost:3000/fr/saint-valentin-seine',
      ],
      // Build and start the production server
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'Ready in',
      startServerReadyTimeout: 30000,
      // Number of runs per URL (median is used)
      numberOfRuns: 3,
      settings: {
        // Use mobile preset (default Lighthouse behavior)
        preset: 'desktop',
        // Skip audits that don't apply or are flaky in CI
        skipAudits: ['uses-http2'],
      },
    },
    assert: {
      assertions: {
        // Performance: target > 85
        'categories:performance': ['warn', { minScore: 0.85 }],
        // Accessibility: target > 90
        'categories:accessibility': ['error', { minScore: 0.9 }],
        // Best Practices: target > 90
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        // SEO: target > 95
        'categories:seo': ['error', { minScore: 0.95 }],
        // Core Web Vitals
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
      },
    },
    upload: {
      // Use temporary public storage (free, results expire after 7 days)
      target: 'temporary-public-storage',
    },
  },
};
