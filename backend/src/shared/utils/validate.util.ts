import yup from 'yup'

import { ValidationError } from '../../domain/errors'

const getSchemaErrors = (schema: yup.AnyObjectSchema, data: any) => {
  const checkForUnknownKeys = () => {
    const unknownKeys = Object
      .keys(data)
      .filter((key) => Object.keys(schema.fields).indexOf(key) === -1)

    if (unknownKeys.length) {
      const error = {
        errors: unknownKeys.map((item) => `The field '${item}' is not allowed`)
      }
      throw error
    }
  }

  try {
    checkForUnknownKeys()
    schema.validateSync(data, { abortEarly: false, strict: true })
  } catch ({ errors }) {
    return errors
  }
}

/**
 * @throws ValidationError
 */
export const validateOrFail = (schema: yup.AnyObjectSchema) => (data: any) => {
  const errors = getSchemaErrors(schema, data)
  if (errors) {
    throw new ValidationError(
      'One or more input validation errors occurred',
      errors
    )
  }
}
