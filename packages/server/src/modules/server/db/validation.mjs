import _ from 'lodash'

import { ajv, validatorCompiler } from './compilers.mjs'

/**
 * Exported only for test purpose.
 */
export class ValidationError extends Error {
  constructor({ message, validationErrorMessage, validationErrors }) {
    super(validationErrorMessage ? `${message}: ${validationErrorMessage}` : message)
    this.statusCode = 422
    this.validationErrors = validationErrors
  }
}

export function getValidationFn({ schema, errorMessage }) {
  const validate = validatorCompiler({ schema })
  return ({ data }) => {
    // because Ajv can modify data if you activate some options
    // so just to be safe...
    const dataCopy = _.cloneDeep(data)
    const valid = validate(dataCopy)
    if (!valid) {
      throw new ValidationError({
        message: errorMessage,
        validationErrorMessage: ajv.errorsText(validate.errors, { dataVar: '' }),
        validationErrors: validate.errors,
      })
    }
    return dataCopy
  }
}
