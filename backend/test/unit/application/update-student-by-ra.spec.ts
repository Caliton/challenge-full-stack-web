import { UpdateStudentByRA } from '../../../src/application/student'
import { ValidationError } from '../../../src/domain/errors'
import { createMockGetStudentByRA, createMockStudentRepo } from '../../utils/student.mock.repo'

describe('UpdateStudentByRA | ApplicationService', () => {
  const mockStudentRepo = createMockStudentRepo()
  const mockGetStudentByRA = createMockGetStudentByRA()
  const updateStudentByRA = new UpdateStudentByRA(
    // @ts-ignore
    mockGetStudentByRA,
    mockStudentRepo
  )

  const fakeRA = 'ABC123'
  const fakeStudent = {
    ra: fakeRA,
    name: 'Will Smith',
    email: 'will.smith@mail.com',
    cpf: '88961083066'
  }

  it('should update deficiency by id', async () => {
    const result = await updateStudentByRA.execute(fakeRA, fakeStudent)

    expect(mockGetStudentByRA.execute).toHaveBeenCalledWith(fakeRA)
    expect(mockStudentRepo.save).toHaveBeenCalledWith(expect.objectContaining({
      ra: fakeRA,
      name: 'Will Smith',
      email: 'will.smith@mail.com',
      cpf: '88961083066'
    }))
    expect(result).toEqual(expect.objectContaining({
      ra: fakeRA,
      name: 'Will Smith',
      email: 'will.smith@mail.com',
      cpf: '88961083066',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    }))
  })

  it('should not update deficiency by academic record if invalid data to update', async () => {
    // @ts-ignore
    const promise = updateStudentByRA.execute(fakeRA, { name: 1 })
    await expect(promise)
      .rejects
      .toThrow(ValidationError)
  })

  it('should pass exception to front if "GetStudentByRA.execute" throws exception', async () => {
    mockGetStudentByRA.execute.mockRejectedValueOnce(new Error())

    const promise = updateStudentByRA.execute(fakeRA, fakeStudent)
    await expect(promise)
      .rejects
      .toThrow(Error)
  })

  it('should pass exception to front if "IStudentRepo.save" throws exception', async () => {
    mockStudentRepo.save.mockRejectedValueOnce(new Error())

    const promise = updateStudentByRA.execute(fakeRA, fakeStudent)
    await expect(promise)
      .rejects
      .toThrow(Error)
  })
})
