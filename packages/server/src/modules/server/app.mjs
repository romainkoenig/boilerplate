import { clerkPlugin }  from '@clerk/fastify'
import Fastify from 'fastify'

import config from './config.mjs'
import dbConnector from './plugins/db.plugin.mjs'
import plugins from './plugins/index.mjs'
import routes from './routes/index.mjs'

export async function build(options = {}) {
  const app = Fastify(options)


  // Register Clerk plugin first (required for authentication)
  await app.register(clerkPlugin, {
    hookName: 'onRequest',
    publishableKey: config.public.auth.publicKey,
    secretKey: config.private.auth.secretKey,
  })

  // Register all the plugins!
  await app.register(plugins)
  await app.register(dbConnector, {
    uri: config.private.server.db.uri,
    dbName: config.private.server.db.dbName,
  })

  // Register all the routes!
  await app.register(routes)

  return app
}
