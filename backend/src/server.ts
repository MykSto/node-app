import app from './app'
import http from 'http'
import { loadPlanets } from './routes/planets/data'
import { mongooseConnect } from './services/mongoose'
import config from 'config'

const PORT = config.get('local.be.port')

const server = http.createServer(app)

async function startServer () {
  await mongooseConnect()
  await loadPlanets()

  server.listen(PORT, () => {
    console.log(`PORT enabled at: ${PORT}...`)
  })
}

startServer()
