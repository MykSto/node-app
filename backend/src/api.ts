import express from 'express'
import getAllPlanets from './routes/planets/router'
import getLaunches from './routes/launches/router'

export const api = () => {
  return express.Router()
    .get('/planets', getAllPlanets)
    .get('/launches', getLaunches)
}
