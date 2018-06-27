const path = require('path')

module.exports = {
  mode: 'production',
  target: 'electron-main',
  externals: [
    'fsevents',
  ],
  entry: {
    main: [
      path.join(__dirname, './electron/main.js'),
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './lib'),
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  optimization: {
    minimize: true,
  },
  node: {
    global: true,
    process: true,
    Buffer: true,
    __dirname: false,
    __filename: false,
  },
}