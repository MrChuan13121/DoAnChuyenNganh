module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // [
    //   "@babel/plugin-proposal-decorators",
    //   {
    //       "legacy": true
    //   }
    // ],
    ["module:react-native-dotenv", {
      "envName": "APP_ENV",
      "moduleName": "@env",
      "path": ".env",
      "blocklist": null,
      "allowlist": null,
      "safe": false,
      "allowUndefined": true,
      "verbose": false
    }],
    ["module-resolver", {
      "alias": {
        "@src": "./src",
        "@components": "./src/components",
        "@screens": "./src/screens",
        "@constants": "./src/constants",
        "@assets": "./assets",
        "@styles": "./src/styles",
        "@modules": "./src/modules",
        "@stores": "./src/stores",
        "@services": "./src/services"
      },
      "extensions": [
        '.ios.js',
        '.android.js',
        '.js',
        '.jsx',
        '.json',
        '.tsx',
        '.ts',
        '.native.js'
      ]
    }]
  ]
};
