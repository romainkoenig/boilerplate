import { clerkClient, clerkPlugin, getAuth } from '@clerk/fastify'
import plugin from 'fastify-plugin'

export default plugin(
  async (instance) => {
    // instance.register(clerkPlugin)
    instance.decorateRequest('authUser', null)

    // Add a method to mark routes as requiring authentication
    instance.addHook('preValidation', async (request) => {
      try {
        request.log.info('getAuth')
        const { userId, tokenType, sessionClaims } = getAuth(request)
        request.log.info('userId', userId)
        request.log.info('tokenType', tokenType)
        request.log.info('sessionClaims', sessionClaims)
        // If user isn't authenticated, return a 401 error
        if (!userId) {
          request.log.info('User not authenticated')
          return instance.throwUnauthorized()
        }

        // Use `clerkClient` to access Clerk's Backend SDK methods
        // and get the user's User object
        const user = userId ? await clerkClient.users.getUser(userId) : null
        request.log.info('user', user)

        // # TODO : remove session claims after seing once
        request.log.info(
          { userId, tokenType, sessionClaims },
          'Request successfully authenticated'
        )

        request.authUser = user
      } catch (error) {
        // If Clerk is not properly configured, skip authentication for now
        request.log.warn('Clerk not properly configured, skipping authentication', error)
        request.authUser = { id: 'test-user', email: 'test@example.com' }
      }
    })
  },
  { name: 'clerk-plugin-authentication' }
)
