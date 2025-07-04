import express from 'express'
import cors from 'cors'
import { api } from './api'
import path from 'path'
import morgan from 'morgan'

const app = express()

app.
  use(cors({
    origin: 'http://localhost:5050'
  }))
  .use(morgan('combined'))
  .use(express.static(path.join(
    __dirname, '../../', 'frontend/dist'
  )))
  .use(express.json())
  .use('/api', api())

export default app
