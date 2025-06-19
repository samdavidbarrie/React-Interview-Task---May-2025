import '@testing-library/jest-dom'

beforeAll(() => {
  global.ResizeObserver =
    global.ResizeObserver ||
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }

  // Mock window.matchMedia for all tests (JSDOM does not implement it)
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(), 
      removeListener: jest.fn(), 
      dispatchEvent: jest.fn(),
    })),
  })
})
