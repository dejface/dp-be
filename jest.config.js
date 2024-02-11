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
};

const createJestConfig = nextJest({
    dir: "./",
});

module.exports = createJestConfig(config);
