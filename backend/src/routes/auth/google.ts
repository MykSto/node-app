// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import express, { Request, Response } from 'express'
import passport from 'passport'
import config from 'config'
import { Strategy } from 'passport-google-oauth20'

const router = express.Router()
const google = config.get('google') as { client_id: string, client_secret: string }

const AUTH_COFIG = {
  clientID: google.client_id,
  clientSecret: google.client_secret,
  callbackURL: '/api/auth/google/callback'
}

const verifyCallback = (
  _accessToken, _refreshToken, profile, done
) => {
  console.log('Google profile', profile)

  done(null, profile)
}

passport.use(new Strategy(AUTH_COFIG, verifyCallback))

router
  .get(
    '/google/callback',
    passport.authenticate('google', {
      failureRedirect: 'https://localhost:5050/login',
      successRedirect: 'https://localhost:5050',
      session: false
    }),
    (req: Request, res: Response) => {
      console.log('Google has an answer!')
    }
  )
  .get('/google', passport.authenticate('google', {
    scope: ['email']
  }))

export { router }
