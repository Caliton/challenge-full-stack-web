import { Student, IStudentRepo } from '../../domain/student'
import { validateUpdateStudentOrFail } from '../../domain/student/student.validation'
import { IApplicationService } from '../application.service'
import { GetStudentByRA } from './get-student-by-ra'

export class UpdateStudentByRA implements IApplicationService {
  constructor (
    private readonly getStudentByRA: GetStudentByRA,
    private readonly studentRepo: IStudentRepo
  ) {}

  /**
   * @throws ValidationError
   * @throws NotFoundError
   */
  async execute (ra: string, student: Partial<Student>): Promise<Student> {
    // Check if student exists
    await this.getStudentByRA.execute(ra)

    const studentToSave = { ...student, ra }

    validateUpdateStudentOrFail(studentToSave)

    const updatedStudent = await this.studentRepo.save(studentToSave)

    console.info(`Student with academic record ${ra} updated ${updatedStudent}`)

    return updatedStudent
  }
}
