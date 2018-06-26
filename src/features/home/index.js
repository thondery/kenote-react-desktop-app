import React from 'react'
import Screen from './screen'

const routes = {
  path: '/',
  name: '主页',
  childRoutes: [
    { 
      path: 'default', 
      name: '主页', 
      component: Screen, 
      isIndex: true,
    },
  ]
}

export default routes