import { Student, IStudentRepo, RAAlreadyExistsError } from '../../domain/student'
import { validateCreateStudentOrFail } from '../../domain/student/student.validation'
import { uuidv4 } from '../../shared/utils/uuid.util'
import { IApplicationService } from '../application.service'

export class CreateStudent implements IApplicationService {
  constructor (private readonly studentRepo: IStudentRepo) {}

  /**
  * @throws ValidationError
  */
  async execute (student: Student): Promise<Student> {
    validateCreateStudentOrFail(student)

    if (student.ra) {
      const exists = await this.studentRepo.exists(student.ra)
      if (exists) throw new RAAlreadyExistsError(student.ra)
    }

    const savedStudent = await this.studentRepo.save({
      ...student,
      ra: student.ra ? student.ra : this.generateRA()
    })

    console.info(`Student created ${JSON.stringify(savedStudent)}`)

    return savedStudent
  }

  private generateRA (): string {
    return uuidv4().replace(/-/g, '').substring(0, 8).toUpperCase()
  }
}
