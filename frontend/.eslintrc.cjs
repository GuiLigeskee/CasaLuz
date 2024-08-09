module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": [
      "enabled", // Substitua por 'off', 'warn', ou 'error' dependendo do que deseja
      {
        ignore: ["children"], // Exemplo de propriedades a serem ignoradas
        customValidators: [], // Aqui você pode adicionar validadores personalizados, se houver
        skipUndeclared: false, // Coloque 'true' para pular props não declaradas
      },
    ],
    // ... outras regras aqui
  },
};
