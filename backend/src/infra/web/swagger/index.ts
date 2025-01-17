import { Application } from 'express'
import path from 'path'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express'

import { getServerBaseUrl } from '../../../shared/utils'

const TITLE = '+A Educa REST API'

const swaggerOpts: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: TITLE,
      version: 'version'
    },
    servers: [{ url: getServerBaseUrl() }]
  },
  apis: [path.join(__dirname, '*.swagger.{ts,js}'), path.join(__dirname, '..', 'routes', '*.routes.{ts,js}')]
}

const openapiSpec = swaggerJSDoc(swaggerOpts)
const swaggerOptions: SwaggerUiOptions = {
  customSiteTitle: TITLE,
  customCss: '.swagger-ui section.models, .topbar { display: none; }'
}

function setup (app: Application) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec, swaggerOptions))
  app.use('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(openapiSpec)
  })
  console.debug('Swagger successfully configured')
}

export default { setup }
