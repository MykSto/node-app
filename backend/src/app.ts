import express, { Response, Request } from 'express'
import cors from 'cors'
import { api } from './api'
import path from 'path'
import morgan from 'morgan'
import config from 'config'

const app = express()
const origin = config.get('local.fe.url') as string

app.
  use(cors({
    origin
  }))
  .use(morgan('combined'))
  .use(express.json())
  .use(express.static(path.join(
    __dirname, '../../', 'frontend/dist'
  )))
  .use('/api', api())
  .all('/{*splat}', (_req: Request, res: Response) => {
    res.sendFile(path.join(
      __dirname, '../../', 'frontend/dist', 'index.html'
    ))
  })

export default app
