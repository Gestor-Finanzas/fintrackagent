import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // Ignorar carpetas que no queremos lintar
  {
    ignores: ["build", "dist", "node_modules", "coverage", "*.config.js", "scripts"],
  },

  // Reglas base de ESLint
  js.configs.recommended,

  // Reglas específicas para React (hooks + HMR)
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

      // Fast-refresh: permitir hooks (useAuth, useProfile) y wrappers HOC
      // exportados junto al provider en el mismo fichero de contexto.
      "react-refresh/only-export-components": ["warn", {
        allowConstantExport: true,
        allowExportNames: ["useAuth", "useProfile"],
      }],

      // `set-state-in-effect` es demasiado estricta para patrones legítimos
      // de sincronización con sistemas externos (fetch a Supabase, etc.).
      // La dejamos como aviso en lugar de error.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",

      // Vars/imports sin usar: error bloqueante excepto si empiezan con `_`.
      "no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      }],

      // Relajadas para pragmatismo
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];
