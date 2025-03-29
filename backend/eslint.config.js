import tseslint from "typescript-eslint";

export default [
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
    },
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    ignores: ["node_modules/", "dist/"],
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },
];
