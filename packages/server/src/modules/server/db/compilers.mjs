import * as Ajv from 'ajv'
import addFormats from 'ajv-formats'

// eslint-disable-next-line new-cap
export const ajv = new Ajv.default({
  // Fastify default options
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  // Custom options
  allErrors: true,
})

addFormats(ajv)

const defaultCompiler = ({ schema }) => ajv.compile(schema)

export const validatorCompiler = defaultCompiler
