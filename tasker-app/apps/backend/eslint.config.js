import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"

module.exports = {
  files: ["**/*.{js,mjs,cjs,ts}"],
  languageOptions: { globals: globals.node },
  ...pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
}
