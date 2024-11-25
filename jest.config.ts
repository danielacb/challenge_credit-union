import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^@mui/(.*)$": "<rootDir>/node_modules/@mui/$1",
    "\\.(svg)$": "<rootDir>/__mocks__/jest.mock.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts", "@emotion/jest"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "d.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleDirectories: ["node_modules", "src"],
  modulePaths: ["<rootDir>/src/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",
    "!src/types/**/*.d.ts",
    "!src/utils/tests.tsx",
    "!<rootDir>/node_modules/",
    "!<rootDir>/src/**/styles.ts",
    "!<rootDir>/src/components/Icons/*",
  ],
};

export default config;
