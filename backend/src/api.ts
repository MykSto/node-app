import express from 'express'
import { router as PlanetsRouter } from './routes/planets/router'
import { router as LaunchRouter } from './routes/launches/router'

export const api = () => {

  const router = express.Router()

  return router
    .use('/planets', PlanetsRouter)
    .use('/launches', LaunchRouter)
}
