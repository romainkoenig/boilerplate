import plugin from 'fastify-plugin'

import privateApi from './private.routes.mjs'
import publicApi from './public.routes.mjs'

export default plugin(async (instance) => {
  instance.register(publicApi, { prefix: '/api' })
  instance.register(privateApi, { prefix: '/api' })
})
