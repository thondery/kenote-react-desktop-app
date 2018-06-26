// ------------------------------------
// Project Config File
// ------------------------------------
module.exports = {
  srcDir       : 'src',
  outDir       : 'dist',
  publicPath   : '',
  devPort      : 9090,
  entry: {
    index: './index.js'
  },
  vendors: {
    vendor0: [
      'babel-polyfill',
      'react-hot-loader',
      'anujs',
      'redux',
      'react-redux',
      'redux-logger',
      'redux-thunk',
      'react-router',
      'react-router-dom',
      'react-router-redux',
      'http-services'
    ],
  },
  manifest     : 'dll/[name]-manifest.json',
  alias: {
    'react': 'anujs',
    'react-dom': 'anujs',
    'prop-types': 'anujs/lib/ReactPropTypes',
    'create-react-class': 'anujs/lib/createClass',
    //如果你在移动端用到了onTouchTap事件
    'react-tap-event-plugin': 'anujs/lib/injectTapEventPlugin',  
  },
  environment: {
    api: { 
      domain: 'http://localhost:4000', 
      apiPath: '/api/v1' 
    }
  },
  globals      : {
    __DESKTOP__  : true,
  },
  
}