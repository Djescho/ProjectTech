module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["wesbos"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  parser: "Prettier",
  rules: {
    quotes: ["error", "double"],
    "no-console": 2,
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: true,
        printWidth: 120,
        tabWidth: 8,
      },
    ],
  },
};
