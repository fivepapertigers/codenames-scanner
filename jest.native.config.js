module.exports = {
  "preset": "jest-expo",
  "transformIgnorePatterns": [
      "node_modules/(?!(jest-)?react-native|expo)"
 ],
 "testPathIgnorePatterns": [
    "/node_modules/", "/backend/"
  ]
};
