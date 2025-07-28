import express, { Request, Response } from 'express'
import passport from 'passport'
import config from 'config'

const router = express.Router()
const feRoute: string = config.get('local.fe.url')

router
  .get('/google', passport.authenticate('google', {
    scope: ['email']
  }))
  .get(
    '/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
      successRedirect: feRoute,
      session: true
    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_req: Request, _res: Response) => {
      console.log('Google has an answer!')
    }
  )

export { router }
