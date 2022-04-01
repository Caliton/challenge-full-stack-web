import { Router } from 'express'

import { createStudent, deleteStudentByRA, getStudentByRA, studentRepo, updateStudentByRA } from '../../../shared/instances'
import { pagination } from '../middlewares'

export const studentsRoutes = Router()

/**
* @swagger
*
* definitions:
*   StudentCreate:
*     type: object
*     required:
*       - name
*       - email
*       - cpf
*     properties:
*       name:
*         type: string
*         example: João da Silva
*       email:
*         type: string
*         example: joao.silva@mail.com
*       cpf:
*         type: string
*         example: 61324332018
*
*   StudentUpdate:
*     type: object
*     properties:
*       name:
*         type: string
*         example: João da Silva
*       email:
*         type: string
*         example: joao.silva@mail.com
*       cpf:
*         type: string
*         example: 61324332018
*
*   StudentResponse:
*     type: object
*     properties:
*       ra:
*         type: string
*         example: ABC123
*       name:
*         type: string
*         example: João da Silva
*       email:
*         type: string
*         example: joao.silva@mail.com
*       cpf:
*         type: string
*         example: 61324332018
*       createdAt:
*         type: string
*         example: 2022-01-30T19:50:15.462Z
*       updatedAt:
*         type: string
*         example: 2022-01-30T19:50:15.462Z
*/

/**
* @swagger
*
* /students:
*   post:
*     tags: ['Student']
*     summary: Create an student
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/StudentCreate'
*     responses:
*       '201':
*         description: Created
*         content:
*           application/json:
*             schema:
*               $ref: '#/definitions/StudentResponse'
*       '400':
*         description: Bad request
*         content:
*           application/json:
*             schema:
*               $ref: '#/definitions/BadRequestError'
*       '422':
*         description: Unprocessable Entity
*         content:
*           application/json:
*             schema:
*               $ref: '#/definitions/RAAlreadyExistsError'
*       '500':
*         description: Internal server error
*/
studentsRoutes.post('/', async (req, res, next) => createStudent
  .execute(req.body)
  .then((student) => res.status(201).json(student))
  .catch(next))

/**
* @swagger
*
* /students:
*   get:
*     tags: ['Student']
*     summary: Get students list
*     parameters:
*       - $ref: '#/parameters/page'
*       - $ref: '#/parameters/limit'
*       - $ref: '#/parameters/order'
*       - in: query
*         name: name
*         schema:
*           type: string
*         description: search by partial name (case insensitive and ignore accents)
*       - in: query
*         name: email
*         schema:
*           type: string
*         description: search by email
*       - in: query
*         name: cpf
*         schema:
*           type: string
*         description: search by cpf
*     responses:
*       '200':
*         description: Ok
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: array
*                   items:
*                     $ref: '#/definitions/StudentResponse'
*                 page:
*                   type: number
*                   example: 2
*                 limit:
*                   type: number
*                   example: 10
*       '500':
*         description: Internal server error
*/
studentsRoutes.get('/', pagination, (req, res, next) => {
  const { page, limit, order } = res.locals
  const { name, email, cpf } = req.query as { [key: string]: string }
  return studentRepo
    .find({ page, limit, order, name, email, cpf })
    .then((paginatedStudent) => res.status(200).json(paginatedStudent))
    .catch(next)
})

/**
* @swagger
*
* /students/{ra}:
*   get:
*     tags: ['Student']
*     summary: Get student by academic record
*     parameters:
*       - in: path
*         name: ra
*     responses:
*       '200':
*         description: OK
*         content:
*           application/json:
*             schema:
*               $ref: '#/definitions/StudentResponse'
*       '404':
*         description: Bad request
*         content:
*           application/json:
*             schema:
*               $ref: '#/definitions/StudentNotFoundError'
*       '500':
*         description: Internal server error
*/
studentsRoutes.get('/:ra', (req, res, next) => getStudentByRA
  .execute(req.params.ra)
  .then((student) => res.status(200).json(student))
  .catch(next))

/**
* @swagger
*
* /students/{ra}:
*   patch:
*     tags: ['Student']
*     summary: Update student by academic record
*     parameters:
*       - in: path
*         name: ra
*         required: true
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/StudentUpdate'
*     responses:
*       '200':
*         description: OK
*         content:
*           application/json:
*             schema:
*               $ref: '#/definitions/StudentResponse'
*       '400':
*         description: Bad request
*         content:
*           application/json:
*             schema:
*               $ref: '#/definitions/BadRequestError'
*       '404':
*         description: Bad request
*         content:
*           application/json:
*             schema:
*               $ref: '#/definitions/StudentNotFoundError'
*       '500':
*         description: Internal server error
*/
studentsRoutes.patch('/:ra', async (req, res, next) => updateStudentByRA
  .execute(req.params.ra, req.body)
  .then((student) => res.status(200).json(student))
  .catch(next))

/**
* @swagger
*
* /students/{ra}:
*   delete:
*     tags: ['Student']
*     summary: Delete student by academic record
*     parameters:
*       - in: path
*         name: ra
*         required: true
*     responses:
*       '204':
*         description: No content
*       '400':
*         description: Bad request
*         content:
*           application/json:
*             schema:
*               $ref: '#/definitions/BadRequestError'
*       '404':
*         description: Bad request
*         content:
*           application/json:
*             schema:
*               $ref: '#/definitions/StudentNotFoundError'
*       '500':
*         description: Internal server error
*/
studentsRoutes.delete('/:ra', (req, res, next) => deleteStudentByRA
  .execute(req.params.ra)
  .then(() => res.status(204).send())
  .catch(next))
