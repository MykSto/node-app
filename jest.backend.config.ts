import type { Config } from 'jest'
import { createDefaultPreset } from 'ts-jest'

const tsJestTransformCfg = createDefaultPreset().transform

export default {
  preset: './jest-preset.js',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  clearMocks: true,
  collectCoverage: true,
  displayName: 'node-test',
  testMatch: [
    '<rootDir>/backend/src/__tests__/**/*.test.(ts|tsx)'
  ],
  testEnvironment: 'node',
  transform: {
    ...tsJestTransformCfg
  }
} satisfies Config
