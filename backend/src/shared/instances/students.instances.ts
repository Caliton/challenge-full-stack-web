import { CreateStudent, DeleteStudentByRA, GetStudentByRA, UpdateStudentByRA } from '../../application/student'
import { StudentRepo } from '../../infra/db/repositories'

export const studentRepo = new StudentRepo()

export const createStudent = new CreateStudent(studentRepo)

export const getStudentByRA = new GetStudentByRA(studentRepo)

export const updateStudentByRA = new UpdateStudentByRA(getStudentByRA, studentRepo)

export const deleteStudentByRA = new DeleteStudentByRA(getStudentByRA, studentRepo)
