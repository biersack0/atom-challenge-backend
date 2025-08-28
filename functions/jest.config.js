const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,js}", "!src/**/*.d.ts"],
  coverageDirectory: "coverage",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: ["**/integration/**/*.spec.ts", "**/unit/**/*.spec.ts"],
  coveragePathIgnorePatterns: [
    "node_modules",
    "dist",
    "src/container",
    "src/interfaces/app.ts",
    "src/infrastructure/database/",
    ".*\\.router\\.ts",
    ".*\\.controller\\.ts",
  ]
};