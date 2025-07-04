import app from './app'
import http from 'http'
import { loadPlanets } from './routes/planets/data'
import mongoose from 'mongoose'

const PORT = 9000

const server = http.createServer(app)

const MONGO_URL = `mongodb+srv://hushokas-api:${process.env.MONOG_PASS}@cluster0.ciaep03.mongodb.net/nasa?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connection.once('open', () => {
  console.log('MongoDB is ready')
})

mongoose.connection.on('error', err => {
  console.error('MongoDB error', err)
})

async function startServer () {
  await mongoose.connect(MONGO_URL)

  await loadPlanets()

  server.listen(PORT, () => {
    console.log(`PORT enabled at: ${PORT}...`)
  })
}

startServer()
