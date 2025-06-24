import type { Config } from 'jest'

export default {
  preset: './jest-preset.js',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  clearMocks: true,
  collectCoverage: true,
  displayName: 'node-test',
  testMatch: [
    '<rootDir>/backend/src/__tests__/**/*.test.(ts|tsx)'
  ],
  testEnvironment: 'jest-environment-jsdom'
} satisfies Config
