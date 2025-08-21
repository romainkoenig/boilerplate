import { clerkClient, getAuth } from '@clerk/fastify'

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
export default async function helloPrivateRoute(fastify) {
  fastify.get('/',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: { hello: { type: 'string' } },
          },
        },
      },
    },
    async (request) => {
      const { userId, tokenType, sessionClaims } = getAuth(request)
      request.log.info('userId', userId)
      const user = userId ? await clerkClient.users.getUser(userId) : null
      if (!user) {
        throw fastify.httpErrors.unauthorized('You are not authorized to access this route')
      }
      request.log.info('user', user)
      request.log.info('tokenType', tokenType)
      request.log.info('sessionClaims', sessionClaims)

      return { hello: 'I am a private route!' }
    })
}
