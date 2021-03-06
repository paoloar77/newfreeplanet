module.exports = {
  globals: {
    __DEV__: true,
  },
  verbose: true,
  testURL: 'http://localhost/',
  collectCoverage: false,
  coverageDirectory: '<rootDir>/test/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.vue',
    '<rootDir>/src/common/**/*.ts',
    '<rootDir>/src/directives/**/*.ts',
    '<rootDir>/src/layouts/**/*.vue',
    '<rootDir>/src/mixins/**/*.ts',
    '<rootDir>/src/model/**/*.ts',
    '<rootDir>/src/pages/**/*.vue',
    '<rootDir>/src/plugins/**/*.ts',
    '<rootDir>/src/root/**/*.ts',
    '<rootDir>/src/utils/**/*.ts',
    '<rootDir>/src/views/**/*.ts',
    '<rootDir>/src/views/**/*.vue',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  testMatch: [
    '<rootDir>/**/__tests__/**/*.spec.ts',
  ],
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
    'vue',
  ],
  moduleNameMapper: {
    '^vue$': '<rootDir>/node_modules/vue/dist/vue.common.js',
    '^quasar$': '<rootDir>/tmp/quasar.common.js',
    '^~/(.*)$': '<rootDir>/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '.*\\.vue$': '<rootDir>/node_modules/vue-jest',
    '.*\\.ts$': '<rootDir>/node_modules/ts-jest',
  },
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue',
  ],
}
