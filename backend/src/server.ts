import fs from 'fs'
import app from './app'
import https from 'https'
import { loadPlanets } from './routes/planets/data'
import { mongooseConnect } from './services/mongoose'
import config from 'config'
import { getSpacexLaunches } from './routes/launches/data'
import path from 'path'

const PORT = config.get('local.be.port')
const certPath = path.join(__dirname, '../../certs/')

const server = https.createServer({
  key: fs.readFileSync(`${certPath}key.pem`),
  cert: fs.readFileSync(`${certPath}cert.pem`)
}, app)

async function startServer () {
  await mongooseConnect()
  await loadPlanets()
  await getSpacexLaunches()

  server.listen(PORT, () => {
    console.log(`PORT enabled at: ${PORT}...`)
  })
}

startServer()
