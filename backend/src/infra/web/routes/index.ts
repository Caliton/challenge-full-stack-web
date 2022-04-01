import { Application, Router } from 'express'

import { studentsRoutes } from './student.routes'

const routes = Router()

function setup (app: Application) {
  routes.use('/students', studentsRoutes)
  console.debug('Route /students successfully configured')

  routes.get('/health-check', (req, res) => res.send('It\'s running :)'))
  console.debug('Route /health-check successfully configured')

  app.use(routes)
}

export default { setup }
