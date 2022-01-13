const jestConfig = {
  verbose: true,
  testURL: "http://localhost/",
  testMatch: ["**/__tests__/*.js"],
  transformIgnorePatterns: ["/node_modules/(?!gsap)"],
};

module.exports = jestConfig;
