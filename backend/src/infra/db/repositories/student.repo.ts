import { execSQL } from '..'

import { PaginationOptions, Paginated } from '../../../domain/common'
import { IStudentQueryOptions, IStudentRepo, Student } from '../../../domain/student'
export class StudentRepo implements IStudentRepo {
  async exists (ra: string): Promise<boolean> {
    const sql = 'SELECT 1 FROM student WHERE ra = $1;'
    const [result] = await execSQL<Student>(sql, [ra])
    return !!result
  }

  async save ({ ra, name, email, cpf }: Partial<Student>): Promise<Student> {
    let fieldsUpdateSql = ''
    if (name) fieldsUpdateSql += '"name" = $2, '
    if (email) fieldsUpdateSql += '"email" = $3, '
    if (cpf) fieldsUpdateSql += '"cpf" = $4, '

    const sql = `INSERT INTO student ("ra", "name", "email", "cpf") 
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ON CONSTRAINT pk_student
      DO UPDATE SET ${fieldsUpdateSql} "updatedAt" = now() WHERE student."ra" = $1
      RETURNING *;`

    const [result] = await execSQL<Student>(sql, [ra, name, email, cpf])
    return result
  }

  async find ({
    page = 1,
    limit = 10,
    order = {
      name: 'ASC',
      createdAt: 'ASC'
    },
    name,
    email,
    cpf
  }: PaginationOptions & IStudentQueryOptions = {}): Promise<Paginated<Student>> {
    let currentParamNumber = 1
    const params = []

    let sql = 'SELECT * FROM student WHERE 1 = 1 '

    if (name) {
      sql += `AND unaccent("name") ILIKE unaccent($${currentParamNumber}) `
      currentParamNumber++
      params.push(`%${name}%`)
    }

    if (email) {
      sql += `AND "email" = $${currentParamNumber} `
      currentParamNumber++
      params.push(email)
    }

    if (cpf) {
      sql += `AND "cpf" = $${currentParamNumber} `
      currentParamNumber++
      params.push(cpf)
    }

    sql += `ORDER BY ${Object.entries(order)
      .map((el) => `"${el[0]}" ${el[1]}`)
      .join(', ')} `

    sql += `OFFSET $${currentParamNumber} `
    currentParamNumber++
    params.push((page - 1) * limit)

    sql += `LIMIT $${currentParamNumber};`
    currentParamNumber++
    params.push(limit)

    const result = await execSQL<Student>(sql, params)

    return {
      data: result,
      page: page,
      limit: limit
    }
  }

  async findByRA (ra: string): Promise<Student | undefined> {
    const sql = 'SELECT * FROM student WHERE ra = $1;'
    const [result] = await execSQL<Student>(sql, [ra])
    return result
  }

  async deleteByRA (ra: string): Promise<void> {
    const sql = 'DELETE FROM student WHERE ra = $1;'
    await execSQL<Student>(sql, [ra])
  }
}
