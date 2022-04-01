import 'dotenv/config'
import 'reflect-metadata'
// import { connectDb } from './infra/db'

(async () => {
  // await connectDb()

  const server = await import('./infra/web/server')
  server.default.start()
})()
