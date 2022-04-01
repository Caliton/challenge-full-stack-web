import * as CPF from 'cpf'
import * as yup from 'yup'

import { validateOrFail } from '../../shared/utils'

const raSchema = yup.string().max(20)
const nameSchema = yup.string().max(100)
const emailSchema = yup.string().email()
const cpfSchema = yup.string().max(11)
  .test('cpf', 'Field must be a valid CPF', (value: any) => CPF.isValid(value))

/**
 * @throws ValidationError
 */
export const validateRAOrFail = validateOrFail(yup.object().shape({
  ra: raSchema.required()
}))

/**
 * @throws ValidationError
 */
export const validateCreateStudentOrFail = validateOrFail(yup.object().shape({
  ra: raSchema,
  name: nameSchema.required(),
  email: emailSchema.required(),
  cpf: cpfSchema.required()
}))

/**
 * @throws ValidationError
 */
export const validateUpdateStudentOrFail = validateOrFail(yup.object().shape({
  ra: raSchema,
  name: nameSchema,
  email: emailSchema,
  cpf: cpfSchema
}))
