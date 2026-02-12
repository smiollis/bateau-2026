import "@testing-library/jest-dom/vitest";

// Mock window.gtag globally
Object.defineProperty(window, "gtag", {
  value: vi.fn(),
  writable: true,
});

// Mock window.dataLayer
Object.defineProperty(window, "dataLayer", {
  value: [],
  writable: true,
});
