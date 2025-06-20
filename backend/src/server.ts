import app from './app'
import http from 'http'
import data from './routes/planets/data'

const PORT = 9000

const server = http.createServer(app)

async function startServer () {
  // TODO: should it be here?
  await data.loadPlanets()

  server.listen(PORT, () => {
    console.log(`PORT enabled at: ${PORT}...`)
  })
}

startServer()
