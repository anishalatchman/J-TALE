module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/utils/DAO/*.js", "src/utils/Interactor/*.js"],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
  // coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    axios: "axios/dist/node/axios.cjs",
    "\\.(css|sass|png)$": "<rootDir>/src/mock/fileMock.js",
  },
  transform: {
    "\\.js$": "<rootDir>/node_modules/babel-jest",
  },
};
