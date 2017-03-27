var path = require('path')

module.exports = {
  entry: './app/boot.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}
