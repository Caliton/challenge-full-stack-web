import { Application, NextFunction, Request, Response } from 'express'

import { DomainError } from '../../domain/errors'
import { isProd } from '../../shared/utils'

interface IError {
  error: string,
  message: string,
  details?: any,
  stack?: string
}

function setup (app: Application) {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err)

    if (isProd()) {
      delete err.stack
    }

    if (err instanceof DomainError) {
      const error: IError = {
        error: err.error,
        message: err.message,
        details: err.details,
        stack: err.stack
      }
      return res.status(err.code).json(error)
    }

    const error: IError = {
      error: 'InternalServerError',
      message: `Internal Server Error - ${err.message}`,
      stack: err.stack
    }
    return res.status(500).json(error)
  })
  console.debug('Error Handler successfully configured')
}

export default { setup }
