import { getPort } from '../../shared/utils'
import { createApp } from './app'

function start (): void {
  const app = createApp()

  const port = getPort()

  app.listen(port, () => console.info(`Running on port ${port}`))
}

export default { start }
