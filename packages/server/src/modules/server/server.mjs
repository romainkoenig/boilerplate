import process from 'node:process'

import { v4 as uuidv4 } from 'uuid'

import { build } from './app.mjs'
import config from './config.mjs'

const server = await build({
  logger: true,
  genReqId: () => uuidv4(),
})

const { port } = config.private.server

const start = async () => {
  try {
    await server.listen({ port, host: '0.0.0.0' })
    server.server.address()
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()

const terminationGracePeriodMs = 1000

async function exit(signal) {
  server.log.info(`received ${signal}, closing fastify server`)
  setTimeout(() => {
    process.exit(0)
  }, terminationGracePeriodMs)
  try {
    await server.close()
    server.log.info('fastify server closed')
  } catch (err) {
    server.log.error({ err }, 'Error when closing fastify server')
  }
}

process.on('SIGINT', () => exit('SIGINT'))
process.on('SIGTERM', () => exit('SIGTERM'))
