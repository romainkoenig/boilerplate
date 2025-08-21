/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
export default async function helloWorldRoute(fastify) {
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
    async () => {
      return { hello: 'world! I am a public route!' }
    })
}
