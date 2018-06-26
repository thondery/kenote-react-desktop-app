const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const configBase = require('./build/webpack.config')

module.exports = merge(configBase, {
  mode: 'production',
  target: 'electron-renderer',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ELECTRON': JSON.stringify(true),
    }),
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        mangle: {
          eval: true,
          toplevel: true,
        },
        parse: {
          html5_comments: false,
        },
        output: {
          comments: false,
          ascii_only: true,
          beautify: false,
        },
        ecma: 5,
        ie8: false,
        compresqs: {
          properties: true,
          unsafe: true,
          unsafe_comps: true,
          unsafe_math: true,
          unsafe_proto: true,
          unsafe_regexp: true,
          unsafe_Func: true,
          dead_code: true,
          unused: true,
          conditionals: true,
          keep_fargs: false,
          drop_console: true,
          drop_debugger: true,
          reduce_vars: true,
          if_return: true,
          comparisons: true,
          evaluate: true,
          booleans: true,
          typeofs: false,
          loops: true,
          toplevel: true,
          top_retain: true,
          hoist_funs: true,
          hoist_vars: true,
          inline: true,
          join_vars: true,
          cascade: true,
          collapse_vars: true,
          reduce_vars: true,
          negate_iife: true,
          pure_getters: true,
          pure_funcs: true,
          // arrows: true,
          passes: 3,
          ecma: 5,
        },
      },
      sourceMap: true
    }),
  ]
})