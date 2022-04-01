import { IStudentRepo } from '../../domain/student'
import { IApplicationService } from '../application.service'
import { GetStudentByRA } from './get-student-by-ra'

export class DeleteStudentByRA implements IApplicationService {
  constructor (
    private readonly getStudentByRA: GetStudentByRA,
    private readonly studentRepo: IStudentRepo
  ) {}

  /**
  * @throws NotFoundError
  * @throws ValidationError
  */
  async execute (ra: string): Promise<void> {
    // Check if student exists
    await this.getStudentByRA.execute(ra)

    await this.studentRepo.deleteByRA(ra)

    console.info(`Student with academic record '${ra}' deleted`)
  }
}
