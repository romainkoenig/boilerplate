import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import sensible from '@fastify/sensible'
import plugin from 'fastify-plugin'


export default plugin(async (instance) => {
  instance.register(cors, () => {
    return (req, callback) => {
      const isLocal = /^localhost$/m.test(req.headers.origin)
      const corsOptions = isLocal ? { origin: false } : {}
      // callback expects two parameters: error and options
      callback(null, corsOptions)
    }
  })
  instance.register(helmet)
  instance.register(sensible)
})
