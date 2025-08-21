import plugin from 'fastify-plugin'

import { database } from '../db/database.mjs'

export default plugin(dbConnector)

async function dbConnector(fastify, options) {
  try {
    const db = await database.connect(options.uri, options.dbName)
    fastify.log.info('Server connected to MongoDB')
    await database.createIndexes()
    fastify.log.info('Server indexes created')
    fastify.decorate('mongo', db)
  } catch (err) {
    fastify.log.error('Failed to connect to MongoDB:', err)
  }

  fastify.addHook('onClose', (_, done) => {
    database.close().then(() => done())
  })
}