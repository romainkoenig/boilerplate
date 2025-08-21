import 'dotenv/config'

import util from 'node:util'

import convict from 'convict'

import authConf from './auth/config.mjs'

const serverConf = {
  private: {
    env: {
      doc: 'The application environment.',
      format: ['production', 'development', 'test'],
      default: 'development',
      env: 'NODE_ENV',
    },
    port: {
      doc: 'The port for HTTP server',
      format: 'port',
      default: 3000,
      env: 'PORT',
    },
    printConfig: {
      doc: 'Print the configuration at the start of the server (useful in dev mode)',
      format: Boolean,
      default: false,
      env: 'PRINT_CONFIG',
    },
    db: {
      uri: {
        doc: 'The URI for the MongoDB database',
        format: String,
        default: 'mongodb://localhost:27017',
        env: 'MONGO_URL',
        sensitive: true,
      },
      dbName: {
        doc: 'The name of the MongoDB database',
        format: String,
        default: 'boilerplate-dev',
        env: 'MONGO_DB_NAME',
      },
    },
  },
}

const config = convict({
  private: {
    server: serverConf.private,
    auth: authConf.private,
  },
  public: { auth: authConf.public },
})

const env = config.get('private.server.env')
const printConfig = config.get('private.server.printConfig')

if (printConfig && env !== 'production') {
  // eslint-disable-next-line no-console
  console.log('Config:', util.inspect(JSON.parse(config.toString()), { depth: 10, colors: true }))
}

config.validate({
  allowed: env === 'production' ? 'strict' : 'warn',
  // output: () => {}, // For what ?
})

export default config.getProperties()


