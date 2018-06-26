const path = require('path')
const fs = require('fs-extra')
const _ = require('lodash')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const project = require('../project.config')
const deploy = require('../deploy.config')
const { getDllReferencePlugin, getHtmlWebpackPlugin } = require('./utils')

const env = process.argv.filter( o => /^(--env)/.test(o) ).join('').replace(/^(--env=)/i, '')
const context = './'

const scssLoader = [
  {
    loader: 'css-loader?minimize',
    options: {
      sourcemap: true
    }
  },
  {
    loader: 'postcss-loader',
  },
  {
    loader: 'sass-loader',
    options: {
      sourcemap: true
    }
  }
]

const config = {
  context: path.resolve(process.cwd(), project.srcDir),
  entry : project.entry,
  output: {
    path: path.resolve(process.cwd(), project.outDir),
    filename: '[name].bundle.js',
    publicPath: project.publicPath,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: project.alias
  },
  plugins: getDllReferencePlugin(
    new webpack.DefinePlugin({
      'PROJECT_ENV': JSON.stringify(deploy[env] || project.environment),
      ...project.globals
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    ...getHtmlWebpackPlugin(context),
    new LodashModuleReplacementPlugin({
      'shorthands'  : true,
      'collections' : true,
      'paths'       : true
    }),
    new HappyPack({
      id: 'happy-babel-js',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: 'happy-json',
      loaders: ['json-loader'],
      threadPool: happyThreadPool
    }),
  ),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules|vendor|bootstrap/,
        loader: 'happypack/loader?id=happy-babel-js'
      },
      {
        test : /\.json$/,
        exclude: /src/,
        loader: 'happypack/loader?id=happy-json'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          ...scssLoader
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]?[hash]'
        }
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 4000000,
    maxAssetSize: 3000000
  },
  devtool: 'source-map'
}

module.exports = config