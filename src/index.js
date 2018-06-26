import 'react-hot-loader/patch'
import 'babel-polyfill'
//import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import configureStore from './store/configureStore'
import Root from './containers/root'
import routeConfig from './store/routeConfig'

const rootNode = document.getElementById('root')
const store = configureStore()

if (process.env.ELECTRON) {
  window.ELECTRON_DISABLE_SECURITY_WARNINGS = true
  window.ELECTRON_ENABLE_SECURITY_WARNINGS = false
}

window.start = () => {
  render((
    <AppContainer>
      <Root store={store} routeConfig={routeConfig} />
    </AppContainer>
  ), rootNode)

  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('./containers/root', () => {
      const NextRoot = require('./containers/root').default // eslint-disable-line
      render(
        <AppContainer>
          <NextRoot store={store} routeConfig={routeConfig} />
        </AppContainer>,
        rootNode
      )
    })
  }
}