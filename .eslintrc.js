/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  settings: {
    react: {
      version: "18",
    },
  },
  extends: ["@ckb-fi/eslint-config/index.js", "plugin:storybook/recommended"],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": 0,
        "@typescript-eslint/ban-ts-comment": 0,
        "react-hooks/exhaustive-deps": 0,
        "react/react-in-jsx-scope": 0,
        "react/jsx-no-target-blank": 0,
        "jsx-a11y/accessible-emoji": 0,
        "react/jsx-no-useless-fragment": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "array-callback-return": 0,
        "no-empty-function": 0,
        "no-case-declarations": 0,
        "trailing-comma": 0,
        "react/prop-types": 0,
        "jsx-a11y/alt-text": 0,
        "no-script-url": 0,
        "no-control-regex": 0,
        "react/display-name": 0,
        "react/no-unescaped-entities": 0,
      },
    },
  ],
};
