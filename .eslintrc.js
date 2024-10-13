module.exports = {
  root: true,
  extends: '@react-native',

  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.svg'],
      },
    },
    'import/ignore': ['*.svg'],
  },
  rules: {
    'import/extensions': ['off'],
  },
};
  

