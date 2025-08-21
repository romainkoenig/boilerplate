// import statementRoutes from '../../statement/statement.routes.mjs'
// import authPlugin from '../plugins/auth.plugin.mjs'

import helloPrivateRoute from './server-routes/hello-private.routes.mjs'

export default async (instance) => {
  // Apply authentication to all routes in this scope
  // instance.register(authPlugin)

  // Register all private routes here :
  instance.register(helloPrivateRoute, { prefix: '/private' })
  instance.all('*', async () => {
    throw instance.httpErrors.notFound("this route doesn't exist")
  })
}
