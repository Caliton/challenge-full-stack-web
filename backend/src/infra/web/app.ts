import cors from 'cors'
import express, { Express } from 'express'

export function createApp (): Express {
  const app = express()

  app.use(express.json())
  app.use(cors())

  console.debug('application successfully configured')

  return app
}
