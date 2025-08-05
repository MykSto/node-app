import express, { Request, Response } from 'express'
import passport from 'passport'
import config from 'config'

const router = express.Router()
const feRoute: string = config.get('local.fe.url')

router
  .get('/google', passport.authenticate('google', {
    scope: ['email']
  }))
  .get('/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
      successRedirect: feRoute,
      session: true
    }))
  .get('/user', (req: Request, res: Response) => {

    const session = req?.session?.passport?.user

    void res.status(201).json({
      verified: !!session
    })

  })

export { router }
