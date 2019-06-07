/// <reference types="mocha" />

declare module '*.json' {
  const value: any;
  export = value;
}

declare module '*.scss' {
  const value: any;
  export = value;
}

declare module 'mocha-steps' {
  const step: Mocha.TestFunction;
  const xstep: Mocha.TestFunction;
}
