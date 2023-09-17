module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  ignorePatterns: ["dist", ".eslintrc.cjs", "prettierrc.js"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  extends: [
    // By extending from a plugin config, we can get recommended rules without having to add them manually.
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: "{.,..}/**/*.+(svg|jpg|png|gif)",
            patternOptions: { dot: true, nocomment: true },
            group: "unknown",
            position: "after",
          },
          {
            pattern: "**/*.+(svg|jpg|png|gif)",
            patternOptions: { dot: true, nocomment: true },
            group: "unknown",
            position: "after",
          },
          {
            pattern: "**/*.+(css)",
            patternOptions: { dot: true, nocomment: true },
            group: "unknown",
            position: "after",
          },
          {
            pattern: "{.,..}/**/*.+(css)",
            patternOptions: { dot: true, nocomment: true },
            group: "unknown",
            position: "after",
          },
        ],
      },
    ],
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
