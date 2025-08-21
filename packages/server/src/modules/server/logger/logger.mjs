import pino from 'pino'

/**
 * When using this logger, you do not have the server informations,
 * when possible, prefer using the fastify logger.
 * But if it's too complicated to pass the fastify server instance,
 * you can use this logger.
 */

const logger = pino({ level: 'info' })

export default logger
