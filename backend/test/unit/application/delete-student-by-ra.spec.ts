import { DeleteStudentByRA } from '../../../src/application/student'
import { createMockGetStudentByRA, createMockStudentRepo } from '../../utils/student.mock.repo'

describe('DeleteStudentByRA | ApplicationService', () => {
  const mockStudentRepo = createMockStudentRepo()
  const mockGetStudentByRA = createMockGetStudentByRA()
  const deleteStudentByRA = new DeleteStudentByRA(
    // @ts-ignore
    mockGetStudentByRA,
    mockStudentRepo
  )

  const fakeRA = 'ABC123'

  it('should delete student by academic record', async () => {
    const result = await deleteStudentByRA.execute(fakeRA)

    expect(mockGetStudentByRA.execute).toHaveBeenCalledWith(fakeRA)
    expect(mockStudentRepo.deleteByRA).toHaveBeenCalledWith(fakeRA)
    expect(result).toBeUndefined()
  })

  it('should pass exception to front if "GetStudentByRA.execute" throws exception', async () => {
    mockGetStudentByRA.execute.mockRejectedValueOnce(new Error())

    const promise = deleteStudentByRA.execute(fakeRA)
    await expect(promise)
      .rejects
      .toThrow(Error)
  })

  it('should pass exception to front if "IStudentRepo.deleteByRA" throws exception', async () => {
    mockStudentRepo.deleteByRA.mockRejectedValueOnce(new Error())

    const promise = deleteStudentByRA.execute(fakeRA)
    await expect(promise)
      .rejects
      .toThrow(Error)
  })
})
