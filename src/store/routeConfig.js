import { AppEntry, NotFound } from '../containers/app'
import * as Features from '../features'
import { createRoute } from '../utils/route'

export default createRoute({
  context: '/',
  entry: AppEntry,
  features: Features,
  notFound: NotFound
})