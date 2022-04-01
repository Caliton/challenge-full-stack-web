import { CreateStudent } from '../../../src/application/student'
import { ValidationError } from '../../../src/domain/errors'
import { RAAlreadyExistsError } from '../../../src/domain/student'
import { createMockStudentRepo } from '../../utils/student.mock.repo'

describe('CreateStudent | ApplicationService', () => {
  const mockStudentRepo = createMockStudentRepo()
  const createStudent = new CreateStudent(mockStudentRepo)

  const fakeStudent = {
    ra: 'ABC123',
    name: 'Chris Rock',
    email: 'chris.rock@mail.com',
    cpf: '34376377031'
  }

  it('should be able to create a new student', async () => {
    const result = await createStudent.execute(fakeStudent)

    expect(mockStudentRepo.save).toHaveBeenCalledWith(expect.objectContaining({
      ra: 'ABC123',
      name: 'Chris Rock',
      email: 'chris.rock@mail.com',
      cpf: '34376377031'
    }))
    expect(result).toEqual(expect.objectContaining({
      ra: 'ABC123',
      name: 'Chris Rock',
      email: 'chris.rock@mail.com',
      cpf: '34376377031',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    }))
  })

  it('should be able to create a new student without academic record', async () => {
    const { ra, ...fakeStudentWithoutRA } = fakeStudent
    // @ts-ignore
    const result = await createStudent.execute(fakeStudentWithoutRA)

    expect(mockStudentRepo.save).toHaveBeenCalledWith(expect.objectContaining({
      ra: expect.any(String),
      name: 'Chris Rock',
      email: 'chris.rock@mail.com',
      cpf: '34376377031'
    }))
    expect(result).toEqual(expect.objectContaining({
      ra: expect.any(String),
      name: 'Chris Rock',
      email: 'chris.rock@mail.com',
      cpf: '34376377031',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    }))
  })

  it('should not be able to create a new student if academic record exist another student', async () => {
    mockStudentRepo.exists.mockResolvedValueOnce(true)

    const promise = createStudent.execute(fakeStudent)

    await expect(promise)
      .rejects
      .toThrow(RAAlreadyExistsError)
  })

  it('should not be able to create a new student without some attributes', async () => {
    // @ts-ignore
    const promise = createStudent.execute({
      email: 'chris.rock@mail.com',
      cpf: '34376377031'
    })
    await expect(promise)
      .rejects
      .toThrow(ValidationError)
  })

  it('should pass exception to front if "IStudentRepo.save" throws exception', async () => {
    mockStudentRepo.save.mockRejectedValueOnce(new Error())

    const promise = createStudent.execute(fakeStudent)
    await expect(promise)
      .rejects
      .toThrow(Error)
  })
})
