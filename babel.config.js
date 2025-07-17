module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      ['nativewind/babel', { allowModuleTransform: ['expo-linear-gradient'] }]
    ],
    plugins: ['react-native-reanimated/plugin']
  }
}
