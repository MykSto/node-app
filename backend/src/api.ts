import express from 'express'
import getAllPlanets from './routes/planets/router'
import { getLaunches, addNewLaunch } from './routes/launches/router'

export const api = () => {
  return express.Router()
    .get('/planets', getAllPlanets)
    .get('/launches', getLaunches)
    .post('/launches', addNewLaunch)
}
