import { Student } from '../../src/domain/student'

const fakeStudent: Student = {
  ra: 'ABC123',
  name: 'João da Silva Sauro',
  email: 'joao.silva@mail.com',
  cpf: '61324332018',
  createdAt: new Date(),
  updatedAt: new Date()
}

export const createMockStudentRepo = () => ({
  exists: jest.fn().mockResolvedValue(false),
  save: jest.fn().mockImplementation((student: Partial<Student>) => ({
    ...student,
    ra: student.ra ? student.ra : 'ABC123',
    createdAt: new Date(),
    updatedAt: new Date()
  })),
  find: jest.fn().mockResolvedValue([fakeStudent]),
  findByRA: jest.fn().mockImplementation((ra: string) => ({
    ...fakeStudent,
    ra
  })),
  deleteByRA: jest.fn().mockResolvedValue(undefined)
})

export const createMockGetStudentByRA = () => ({
  execute: jest.fn().mockImplementation((ra: string) => ({
    ...fakeStudent,
    ra
  }))
})
