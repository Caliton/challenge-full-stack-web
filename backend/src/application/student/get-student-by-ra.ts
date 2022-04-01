import { NotFoundError } from '../../domain/errors'
import { Student, IStudentRepo } from '../../domain/student'
import { validateRAOrFail } from '../../domain/student/student.validation'
import { IApplicationService } from '../application.service'

export class GetStudentByRA implements IApplicationService {
  constructor (private readonly studentRepo: IStudentRepo) {}

  /**
  * @throws NotFoundError
  * @throws ValidationError
  */
  async execute (ra: string): Promise<Student> {
    validateRAOrFail({ ra })

    const student = await this.studentRepo.findByRA(ra)
    if (!student) {
      throw new NotFoundError('Student not found')
    }

    console.info(`Student with academic record ${ra} found ${student}`)

    return student
  }
}
