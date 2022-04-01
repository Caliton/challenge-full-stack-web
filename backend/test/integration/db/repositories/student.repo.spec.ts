import 'dotenv/config'
import { Student } from '../../../../src/domain/student'
import { closeDb, connectDb, execSQL } from '../../../../src/infra/db'
import { StudentRepo } from '../../../../src/infra/db/repositories'

describe('StudentRepo | Repository', () => {
  let repo: StudentRepo

  const initialConfigDb = async () => {
    await connectDb()
    await execSQL('DELETE FROM student;')
    await execSQL('INSERT INTO student ("ra", "name", "email", "cpf") VALUES (\'ABC123\', \'Chris Rock\', \'chris.rock@mail.com\', \'34376377031\');')
  }

  beforeAll(async () => {
    await initialConfigDb()
    repo = new StudentRepo()
  })

  afterAll(async () => {
    await closeDb()
  })

  describe('exists', () => {
    it('should return "true" if exists student in database', async () => {
      const result = await repo.exists('ABC123')
      expect(result).toBe(true)
    })

    it('should return "false" if not exists student in database', async () => {
      const result = await repo.exists('DEF456')
      expect(result).toBe(false)
    })
  })

  describe('save', () => {
    it('should insert student in database', async () => {
      const student: Student = {
        ra: 'DEF456',
        name: 'Will Smith',
        email: 'will.smith@mail.com',
        cpf: '88961083066'
      }

      const result = await repo.save(student)

      expect(result).toEqual(expect.objectContaining({
        ra: 'DEF456',
        name: 'Will Smith',
        email: 'will.smith@mail.com',
        cpf: '88961083066',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      }))
    })
    it('should update student in database', async () => {
      const result = await repo.save({
        ra: 'DEF456',
        name: 'Maluco no pedaço',
        email: 'maluco.pedaco@mail.com',
        cpf: '38782877041'
      })

      expect(result).toEqual(expect.objectContaining({
        ra: 'DEF456',
        name: 'Maluco no pedaço',
        email: 'maluco.pedaco@mail.com',
        cpf: '38782877041',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      }))
    })
  })

  describe('findByRA', () => {
    it('should return "student" if exists student in database', async () => {
      const result = await repo.findByRA('DEF456')

      expect(result).toEqual(expect.objectContaining({
        ra: 'DEF456',
        name: 'Maluco no pedaço',
        email: 'maluco.pedaco@mail.com',
        cpf: '38782877041',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      }))
    })

    it('should return "undefined" if not exists student in database', async () => {
      expect(await repo.findByRA('NOT_EXISTS_RA')).toBeUndefined()
    })
  })

  describe('deleteByRA', () => {
    it('should return "undefined" if exists student deleted of database', async () => {
      expect(await repo.deleteByRA('DEF456')).toBeUndefined()
      expect(await repo.exists('DEF456')).toBe(false)
    })
  })

  describe('find', () => {
    it('should return "Paginated<Student>"', async () => {
      const result = await repo.find()
      expect(result).toEqual({
        page: 1,
        limit: 10,
        data: expect.arrayContaining([
          expect.objectContaining({
            ra: 'ABC123',
            name: 'Chris Rock',
            email: 'chris.rock@mail.com',
            cpf: '34376377031',
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
          })
        ])
      })
    })

    it('should return "Paginated<Student>" with options', async () => {
      const result = await repo.find({
        name: 'Chris Rock',
        email: 'chris.rock@mail.com',
        cpf: '34376377031'
      })

      expect(result).toEqual({
        page: 1,
        limit: 10,
        data: expect.arrayContaining([
          expect.objectContaining({
            ra: 'ABC123',
            name: 'Chris Rock',
            email: 'chris.rock@mail.com',
            cpf: '34376377031',
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
          })
        ])
      })
    })

    it('should return empty data "Paginated<Student>" with options', async () => {
      const result = await repo.find({
        page: 2
      })

      expect(result).toEqual({
        page: 2,
        limit: 10,
        data: []
      })
    })
  })
})
