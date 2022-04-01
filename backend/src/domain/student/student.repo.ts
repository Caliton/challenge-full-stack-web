import { Paginated, PaginationOptions } from '../common'
import { Student } from './student'

export type IStudentQueryOptions = {
  name?: string,
  email?: string,
  cpf?: string
}

export interface IStudentRepo {
  /**
   * Checks if there is a deficiency in repository
   */
  exists(ra: string): Promise<boolean>
  /**
   * Save or update Student in repository
   */
  save(student: Partial<Student>): Promise<Student>
  /**
   * Find Students by some parameters
   */
  find(options?: PaginationOptions & IStudentQueryOptions): Promise<Paginated<Student>>
  /**
   * Find Student by academic record
   */
  findByRA(ra: string): Promise<Student | undefined>
  /**
   * Delete Student by academic record
   */
   deleteByRA (ra: string): Promise<void>
}
