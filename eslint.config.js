module.exports = [
    {
      ignores: ["node_modules", "dist", "build"],
    },
    {
      files: ["Backend/**/*.js"],
      languageOptions: {
        sourceType: "commonjs",
        ecmaVersion: "latest",
      },
      rules: {
        "no-unused-vars": "warn",
        "no-console": "off",
        "indent": ["error", 2],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
      },
    },
    {
      files: ["Front/**/*.js", "Front/**/*.jsx"],
      languageOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        parser: require("@babel/eslint-parser"), // Исправляет ошибки JSX
        parserOptions: {
          requireConfigFile: false,
          babelOptions: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      plugins: {
        react: require("eslint-plugin-react"),
        "react-hooks": require("eslint-plugin-react-hooks"),
      },
      rules: {
        "no-unused-vars": "warn",
        "no-console": "warn",
        "react/react-in-jsx-scope": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "indent": ["error", 2],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
      },
    },
  ];
  