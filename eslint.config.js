import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  // Обновляем TypeScript конфигурацию
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    rules: {
      ...config.rules,
      "@typescript-eslint/no-explicit-any": "off",
    },
  })),
  {
    // Обновляем React конфигурацию
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    ignores: ["node_modules/*", "config/*", "dist/*", "build/*"],
  },
];
