import express, { Request, RequestHandler, Response } from 'express'
import { api } from './api'
import path from 'path'
import morgan from 'morgan'
import cookieSession from 'cookie-session'
import passportMiddleware from './passport'

const app = express()

app
  .use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['secretkey', 'secretkeyforrotation']
  }))
  .use((
    req, _res, next
  ) => {
    if (req.session && !req.session.regenerate) {
      req.session.regenerate = (cb: () => void) => {
        cb()
      }
    }

    if (req.session && !req.session.save) {
      req.session.save = (cb: () => void) => {
        cb()
      }
    }

    next()
  })
  .use(passportMiddleware as unknown as RequestHandler)
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
