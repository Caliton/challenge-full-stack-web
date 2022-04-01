import { GetStudentByRA } from '../../../src/application/student'
import { NotFoundError, ValidationError } from '../../../src/domain/errors'
import { createMockStudentRepo } from '../../utils/student.mock.repo'

describe('GetStudentByRA | ApplicationService', () => {
  const mockStudentRepo = createMockStudentRepo()
  const getStudentByRA = new GetStudentByRA(mockStudentRepo)

  const fakeRA = 'ABC123'

  it('should find student by academic record', async () => {
    const result = await getStudentByRA.execute(fakeRA)

    expect(mockStudentRepo.findByRA).toHaveBeenCalledWith(fakeRA)
    expect(result).toEqual(expect.objectContaining({
      ra: 'ABC123',
      name: 'João da Silva Sauro',
      email: 'joao.silva@mail.com',
      cpf: '61324332018',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    }))
  })

  it('should not find student by academic record if invalid academic record', async () => {
    // @ts-ignore
    const promise = getStudentByRA.execute(1)
    await expect(promise)
      .rejects
      .toThrow(ValidationError)
  })

  it('should throw "NotFoundError" if student not found', async () => {
    mockStudentRepo.findByRA.mockResolvedValueOnce(undefined)

    const promise = getStudentByRA.execute(fakeRA)
    await expect(promise)
      .rejects
      .toThrow(NotFoundError)
  })
})
