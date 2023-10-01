export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tenon-features/(.*)$': ['<rootDir>/src/features/$1'],
  },
  transform: {
    '^.+\\.vue$': 'vue3-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'vue'],
  testMatch: ['<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  collectCoverage: false,
  // collectCoverageFrom: ['<rootDir>/src/**/*.{ts,vue}', '!<rootDir>/src/index.ts'],
  // coverageReporters: ['html', 'text-summary'],
};
