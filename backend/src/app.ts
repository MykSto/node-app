import express, { Request, RequestHandler, Response } from 'express'
import cors from 'cors'
import { api } from './api'
import path from 'path'
import morgan from 'morgan'
import config from 'config'
import cookieSession from 'cookie-session'
import passportMiddleware from './passport'

const app = express()
const origin = config.get('local.fe.url') as string

app
  .use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['secretkey', 'secretkeyforrotation']
  }))
  .use(passportMiddleware as unknown as RequestHandler)
  .use(cors({
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
