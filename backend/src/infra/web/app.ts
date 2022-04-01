import cors from 'cors'
import express, { Express } from 'express'

import errorHandler from './error-handler'
import routes from './routes'
import swagger from './swagger'

export function createApp (): Express {
  const app = express()

  app.use(express.json())
  app.use(cors())

  swagger.setup(app)
  routes.setup(app)
  errorHandler.setup(app)

  console.debug('application successfully configured')

  return app
}
