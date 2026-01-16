import '@testing-library/jest-dom/vitest';

if (!window.matchMedia) {
  window.matchMedia = () =>
    ({
      matches: false,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
      media: '',
      onchange: null,
    } as any);
}

// 可选：如果后续遇到 ResizeObserver 报错再打开
// if (!(globalThis as any).ResizeObserver) {
//   (globalThis as any).ResizeObserver = class {
//     observe() {}
//     unobserve() {}
//     disconnect() {}
//   };
// }
