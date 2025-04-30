const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      fs: false,
      net: false,
      tls: false,
      assert: require.resolve('assert/'),
      https: require.resolve('https-browserify'),
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'),
      http: require.resolve('stream-http'),
      stream: require.resolve('stream-browserify'),
      os: require.resolve('os-browserify/browser'),
      zlib: require.resolve('browserify-zlib'),
      path: require.resolve('path-browserify'),
      process: require.resolve('process/browser'),
      'process/browser': require.resolve('process/browser'),
    },
    alias: {
      'process/browser': require.resolve('process/browser'),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};
