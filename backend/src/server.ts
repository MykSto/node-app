import app from './app'
import http from 'http'
import { loadPlanets } from './routes/planets/data'
import { mongooseConnect } from './services/mongoose'
import config from 'config'
import { getSpacexLaunches } from './routes/launches/data'

const PORT = config.get('local.be.port')

const server = http.createServer(app)

async function startServer () {
  await mongooseConnect()
  await loadPlanets()
  await getSpacexLaunches()

  server.listen(PORT, () => {
    console.log(`PORT enabled at: ${PORT}...`)
  })
}

startServer()
