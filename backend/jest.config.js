module.exports = {
  // verbose: true,
  roots: ['<rootDir>'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!**/node_modules/**',
    '!<rootDir>/src/infra/**',
    '!<rootDir>/src/container.ts',
    '!<rootDir>/src/main.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 5
    }
  },
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  // testMatch: [
  //   '**/?(*.)(spec|test).?ts?(x)'
  // ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
}
