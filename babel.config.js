module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          '@hooks': './src/hooks',
          '@model': './src/model',
          '@epics': './src/redux/epics',
          '@slices': './src/redux/slices',
          '@services': './src/services',
          '@types': './src/types',
          '@util': './src/utilities',
          '@ui': './src/ui',
          '@components': './src/ui/components',
        },
      },
    ],
  ],
};
