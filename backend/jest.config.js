module.exports = {
  // verbose: true,
  roots: ['<rootDir>'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.mjs',
    '!**/node_modules/**',
    '!<rootDir>/src/tools/**',
    '!<rootDir>/src/container.mjs',
    '!<rootDir>/src/main.mjs'
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  testMatch: [
    '**/?(*.)(spec|test).?ts?(x)'
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
}
