import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: ["build", "dist", "node_modules", "coverage", "*.config.js", "scripts"],
  },

  js.configs.recommended,

  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      // Permitir hooks y HOCs exportados junto al provider en el mismo fichero.
      "react-refresh/only-export-components": ["warn", {
        allowConstantExport: true,
        allowExportNames: ["useAuth", "useProfile"],
      }],

      // Relajadas: se disparan en patrones legítimos de fetch async a
      // sistemas externos (Supabase) y en `reduce` sobre arrays.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",

      "no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      }],

      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];
