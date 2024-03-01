const nextJest = require("next/jest");

/** @type {import('jest').Config} */
const config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/test/jest/jest-dom.tsx"],
};

const createJestConfig = nextJest({
    dir: "./",
});

module.exports = createJestConfig(config);
