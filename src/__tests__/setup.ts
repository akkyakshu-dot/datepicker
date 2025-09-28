/**
 * Test setup file
 */

// Mock CSS imports
jest.mock('../styles/datepicker.css', () => ({}));

// Setup DOM environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Add a dummy test to avoid Jest error
describe('Test Setup', () => {
  test('should setup test environment', () => {
    expect(true).toBe(true);
  });
});