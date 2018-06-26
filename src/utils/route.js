import { Switch, Route } from 'react-router-dom'
import _ from 'lodash'

export function renderRouteConfigV3(Container, routes, contextPath) {
  // Resolve route config object in React Router v3.
  const children = [] // children component list

  const renderRoute = (item, routeContextPath) => {
    let newContextPath
    if (/^\//.test(item.path)) {
      newContextPath = item.path
    } else {
      newContextPath = `${routeContextPath}/${item.path}`
    }
    newContextPath = newContextPath.replace(/\/+/g, '/')
    if (item.component && item.childRoutes) {
      children.push(renderRouteConfigV3(item.component, item.childRoutes, newContextPath))
    } else if (item.component) {
      children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact />)
    } else if (item.childRoutes) {
      item.childRoutes.forEach(r => renderRoute(r, newContextPath))
    }
  }

  routes.forEach(item => renderRoute(item, contextPath))
  
  // Use Switch as the default container by default
  if (!Container) return <Switch>{children}</Switch>
  
  return (
    <Container key={contextPath}>
      <Switch>
        {children}
      </Switch>
    </Container>
  )
}

function handleIndexRoute (route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return
  }

  const indexRoute = route.childRoutes.find(child => child.isIndex)
  if (indexRoute) {
    const first = { ...indexRoute }
    first.path = route.path
    first.exact = true
    first.autoIndexRoute = true
    route.childRoutes.unshift(first)
  }
  route.childRoutes.forEach(handleIndexRoute)
}

const getRoutes = (Features) => {
  let Routes = []
  for (let e of _.keys(Features)) {
    Routes.push(Features[e])
  }
  return Routes
}

export function createRoute (options) {
  let Options = {
    context: '/',
    entry: null,
    features: null,
    notFound: null,
    ...options
  }
  let Routes = {
    path: Options.context || '/',
    component: Options.entry,
    childRoutes: [
      ...getRoutes(Options.features),
      { path: '*', name: 'Page not found', component: Options.notFound }
    ]
  }
  Routes.childRoutes.filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0))
  let routes = [Routes]
  routes.forEach(handleIndexRoute)
  return routes
}