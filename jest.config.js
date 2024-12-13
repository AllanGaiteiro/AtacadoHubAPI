module.exports = {
    moduleFileExtensions: [
      "js",
      "json",
      "ts"
    ],
    rootDir: "src",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    coveragePathIgnorePatterns: [
      "src/main.ts",
      "src/app.module.ts",
      "src/ormconfig.ts",
    ],
    collectCoverageFrom: [
      "**/*.(t|j)s",
      "!**/*.module.(t|j)s", 
      "!**/migration/*.(t|j)s"
    ],
    coverageThreshold: {
        global: {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100
        }
      }
  };
  