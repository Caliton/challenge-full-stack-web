import { ValidationError } from '../../../src/domain/errors'
import {
  validateRAOrFail,
  validateCreateStudentOrFail,
  validateUpdateStudentOrFail
} from '../../../src/domain/student/student.validation'

describe('Student | Validation', () => {
  describe('validateRAOrFail', () => {
    it('should not throws ValidationError', () => {
      expect(validateRAOrFail({ ra: 'ABC123' }))
        .toBeUndefined()
    })

    it('should throws ValidationError', () => {
      // not contain name which is a required field
      expect(() => validateRAOrFail({}))
        .toThrow(ValidationError)

      // invalid type for ra
      expect(() => validateRAOrFail({ ra: 123 })).toThrow(ValidationError)
      expect(() => validateRAOrFail({ ra: 'extremely_large_string' })).toThrow(ValidationError)

      // The field 'impostorField' is not allowed
      expect(() => validateRAOrFail({
        ra: 'ABC123',
        impostorField: 'impostorValue'
      })).toThrow(ValidationError)
    })
  })

  describe('validateCreateStudentOrFail', () => {
    it('should not throws ValidationError', () => {
      expect(validateCreateStudentOrFail({
        ra: 'ABC123',
        name: 'Chris Rock',
        email: 'chris.rock@mail.com',
        cpf: '34376377031'
      })).toBeUndefined()

      expect(validateCreateStudentOrFail({
        name: 'Chris Rock',
        email: 'chris.rock@mail.com',
        cpf: '34376377031'
      })).toBeUndefined()
    })

    it('should throws ValidationError', () => {
      expect(() => validateCreateStudentOrFail({}))
        .toThrow(ValidationError)

      // not contain name which is a required field
      expect(() => validateCreateStudentOrFail({
        ra: 'ABC123',
        email: 'chris.rock@mail.com',
        cpf: '34376377031'
      })).toThrow(ValidationError)

      // invalid type for cpf
      expect(() => validateCreateStudentOrFail({
        ra: 'ABC123',
        name: 'Chris Rock',
        email: 'chris.rock@mail.com',
        cpf: 34376377031
      })).toThrow(ValidationError)

      // The field 'impostorField' is not allowed
      expect(() => validateCreateStudentOrFail({
        ra: 'ABC123',
        name: 'Chris Rock',
        email: 'chris.rock@mail.com',
        cpf: '34376377031',
        impostorField: 'impostorValue'
      })).toThrow(ValidationError)
    })
  })

  describe('validateUpdateStudentOrFail', () => {
    it('should not throws ValidationError', () => {
      expect(validateUpdateStudentOrFail({
        ra: 'ABC123',
        name: 'Chris Rock',
        email: 'chris.rock@mail.com',
        cpf: '34376377031'
      })).toBeUndefined()
    })

    it('should throws ValidationError', () => {
      // not contain name which is a required field
      expect(() => validateCreateStudentOrFail({
        ra: 'ABC123',
        email: 'chris.rock@mail.com',
        cpf: '34376377031'
      })).toThrow(ValidationError)

      // invalid type for cpf
      expect(() => validateUpdateStudentOrFail({
        ra: 'ABC123',
        name: 'Chris Rock',
        email: 'chris.rock@mail.com',
        cpf: 34376377031
      })).toThrow(ValidationError)

      // The field 'impostorField' is not allowed
      expect(() => validateUpdateStudentOrFail({
        ra: 'ABC123',
        name: 'Chris Rock',
        email: 'chris.rock@mail.com',
        cpf: '34376377031',
        impostorField: 'impostorValue'
      })).toThrow(ValidationError)
    })
  })
})
