import config from 'config'
import { GoogleCallbackParameters, Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import passport from 'passport'
import { NextFunction, Request } from 'express'

const google = config.get('google') as { client_id: string, client_secret: string }

const AUTH_COFIG = {
  clientID: google.client_id,
  clientSecret: google.client_secret,
  callbackURL: '/api/auth/google/callback',
  passReqToCallback: true
} as const

const verifyCallback = (
  _req: Request,
  _accessToken: string, _refreshToken: string,
  _params: GoogleCallbackParameters, profile: Profile, done: VerifyCallback
) => {
  done(null, profile)
}

passport.use(new Strategy(AUTH_COFIG, verifyCallback))

passport.serializeUser((user: Record<string, { id: string }>, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  done(null, id)
})

const passportMiddleware = (
  _req: Request, _res: Response, next: NextFunction
): void =>
{
  passport.initialize()
  passport.session()

  next()
}

export default passportMiddleware
