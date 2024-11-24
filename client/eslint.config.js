import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";

import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import preferArrow from "eslint-plugin-prefer-arrow-functions";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tailwind from "eslint-plugin-tailwindcss";
import globals from "globals";
import tseslint from "typescript-eslint";

import pluginQuery from "@tanstack/eslint-plugin-query";

import react from "eslint-plugin-react";

export default tseslint.config(
  // Exclude files and directories from linting
  { ignores: ["dist", "node_modules"] },

  {
    // Base configurations and plugins to extend from
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      jsxA11y.flatConfigs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      ...tailwind.configs["flat/recommended"],
      ...pluginQuery.configs["flat/recommended"],
      prettierPlugin,
    ],

    // Lint specific file types
    files: ["**/*.{ts,tsx}"],

    // Language-level configurations for ECMAScript and TypeScript
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      parser: tsParser,
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    // Plugin-specific settings
    settings: {
      react: { version: "18.3" },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: true, // Enables eslint-import-resolver-typescript
        node: true, // Enables Node.js resolution for imports
      },
      "jsx-a11y": {
        components: {
          Button: "button",
        },
      },
    },

    // Plugins to extend ESLint's capabilities
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      jsxA11y,
      preferArrow,
    },

    // Linting rules for code quality, styling, and best practices
    rules: {
      // React-specific rules
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off", // Disabled for TypeScript
      "react/react-in-jsx-scope": "off", // Not needed in modern React projects
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Enforce arrow functions and prevent function declarations
      "preferArrow/prefer-arrow-functions": [
        "warn",
        {
          allowNamedFunctions: false,
          classPropertiesAllowed: true,
          disallowPrototype: false,
          returnStyle: "unchanged",
          singleReturnOnly: false,
        },
      ],
      "prefer-arrow-callback": [
        "error",
        { allowNamedFunctions: false, allowUnboundThis: true },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: "FunctionDeclaration",
          message: "Use arrow functions instead of function declarations.",
        },
      ],

      // Import-specific rules for module organization and import practices
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/features/auth",
              from: "./src/features",
              except: ["./auth"],
            },
            {
              target: "./src/features",
              from: "./src/app",
            },
            {
              target: [
                "./src/components",
                "./src/hooks",
                "./src/lib",
                "./src/types",
                "./src/utils",
              ],
              from: ["./src/features", "./src/app"],
            },
          ],
        },
      ],
      "import/no-cycle": "error",
      "import/no-unresolved": [
        "error",
        {
          ignore: [
            "\\.css$",
            "\\.scss$",
            "\\.jpg$",
            "\\.jpeg$",
            "\\.png$",
            "\\.svg$",
          ],
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js built-in modules (e.g., fs, path)
            "external", // Third-party libraries from node_modules
            ["parent", "sibling", "index"], // Relative imports in the project
            "internal", // Custom internal modules
            "object", // Imports that require destructuring
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/components/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/features/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/utils/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/styles/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "ignore",
            caseInsensitive: true,
          },
        },
      ],
      "import/default": "off",
      "import/no-named-as-default-member": "off",
      "import/no-named-as-default": "off",

      // General rules for code consistency and quality
      "linebreak-style": ["error", "unix"],
      "jsx-a11y/anchor-is-valid": "off", // Disabled for flexibility in anchor tags
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowInterfaces: "with-single-extends" },
      ],
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],

      // Naming conventions for TypeScript, enforcing consistency across types, variables, and functions
      "@typescript-eslint/naming-convention": [
        "error",

        // PascalCase for types, interfaces ending with "Props", and classes
        {
          selector: ["typeAlias", "interface", "class"],
          format: ["PascalCase"],
        },

        // PascalCase with "T" prefix for type parameters
        {
          selector: "typeParameter",
          format: ["PascalCase"],
        },

        // PascalCase for React functional components (excluding hooks)
        {
          selector: "variable",
          types: ["function"],
          format: ["PascalCase"],
          custom: {
            regex: "^[A-Z]", // Start with a capital letter for PascalCase
            match: true,
          },
          filter: {
            regex: "^(?!use)[A-Z]", // Exclude hooks (functions starting with "use")
            match: true,
          },
        },

        // camelCase, PascalCase, or UPPER_CASE for other variables and variable-like names
        {
          selector: "variableLike",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
        },

        // camelCase for regular functions
        {
          selector: "function",
          format: ["camelCase"],
        },
      ],
    },
  }
);
