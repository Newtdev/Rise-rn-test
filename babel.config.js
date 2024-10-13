module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    // ['react-native-worklets-core/plugin'],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
          'jsx',
        ],
        alias: {
          test: './test',
          underscore: 'lodash',
          '@components': './components',
          '@assets': './assets/',
          '@store': './store',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
