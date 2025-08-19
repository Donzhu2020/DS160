// 测试环境设置
import { vi } from 'vitest';

// Mock Chrome APIs
const mockChrome = {
  runtime: {
    getManifest: vi.fn(() => ({
      version: '1.0.0',
      name: 'DS-160 中文助手'
    })),
    getURL: vi.fn((path: string) => `chrome-extension://test/${path}`),
    onMessage: {
      addListener: vi.fn(),
      removeListener: vi.fn()
    },
    sendMessage: vi.fn(),
    openOptionsPage: vi.fn()
  },
  storage: {
    local: {
      get: vi.fn(() => Promise.resolve({})),
      set: vi.fn(() => Promise.resolve()),
      remove: vi.fn(() => Promise.resolve())
    },
    onChanged: {
      addListener: vi.fn(),
      removeListener: vi.fn()
    }
  },
  tabs: {
    query: vi.fn(() => Promise.resolve([{ id: 1, url: 'https://ceac.state.gov/test' }])),
    sendMessage: vi.fn(() => Promise.resolve({ success: true }))
  },
  action: {
    onClicked: {
      addListener: vi.fn()
    }
  },
  notifications: {
    create: vi.fn()
  }
};

// 设置全局Chrome对象
(global as any).chrome = mockChrome;

// Mock DOM APIs
Object.defineProperty(window, 'location', {
  value: {
    href: 'https://ceac.state.gov/test',
    origin: 'https://ceac.state.gov'
  },
  writable: true
});

// Mock Web APIs
global.MutationObserver = vi.fn(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  takeRecords: vi.fn()
}));

// Mock fetch
global.fetch = vi.fn();

// Mock performance API
Object.defineProperty(window, 'performance', {
  value: {
    now: vi.fn(() => Date.now())
  }
});

// Mock console methods for cleaner test output
console.log = vi.fn();
console.warn = vi.fn();
console.error = vi.fn();
