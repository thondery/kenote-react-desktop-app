const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const configBase = require('./build/webpack.config')
const project = require('./project.config')

module.exports = merge(configBase, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  node: {
    fs: 'empty'
  },
  devServer: {
    contentBase: path.join(__dirname, project.outDir),
    compress: false,
    hot: true,
    port: project.devPort,
    overlay: true,
    historyApiFallback: true,
    publicPath: project.publicPath
  }
})