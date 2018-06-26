
const path = require('path')
const fs = require('fs-extra')
const _ = require('lodash')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const project = require('../project.config')

exports.getDllReferencePlugin = (...items) => {
  let plugins = []
  for (let item of _.keys(project.vendors)) {
    fs.existsSync(path.resolve(process.cwd(), project.manifest)) && 
    plugins.push(
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(`./${project.manifest.replace(/\[name\]/i, item)}`)
      })
    )
  }
  return plugins.concat(...items)
}

function getAssets (name, entry = ['index.bundle.js', 'index.css'], context = './') {
  let assets = []
  let vendors = _.keys(project.vendors).filter( o => _.isArray(project.vendors[o]) && project.vendors[o].length > 0 )
  for (let item of vendors) {
    for (let ext of ['js', 'css']) {
      let filename = `${name}.${ext}`.replace(/\[name\]/i, item)
      fs.existsSync(path.resolve(process.cwd(), project.outDir, filename)) && assets.push(filename)
    }
  }
  assets.push(...entry)
  return assets.map(value => `${context}${value}`)
}

exports.getHtmlWebpackPlugin = (context) => {
  let htmlPlugins = []
  let assetPlugins = []
  for (let item of _.keys(project.entry)) {
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template : path.resolve(process.cwd(), project.srcDir, `${item}.html`),
        filename : `${item}.html`,
        inject   : 'body',
        hash     : true,
        excludeChunks   : ['vendor', item],
        minify   : {
          collapseWhitespace : false
        }
      })
    )
    let entry = [`[name].bundle.js`, `[name].css`].map(value => value.replace(/\[name\]/i, item))
    //!fs.existsSync(path.resolve(process.cwd(), project.outDir, entry[1])) && entry.splice(1, 1)
    assetPlugins.push(
      new HtmlWebpackIncludeAssetsPlugin({
        files: [`${item}.html`],
        assets: getAssets('[name].bundle', entry, context),
        append: false,
        hash: true
      })
    )
  }
  return [...htmlPlugins, ...assetPlugins]
}