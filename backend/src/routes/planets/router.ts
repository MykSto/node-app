import express, { Request, Response } from 'express'
import data from './data'

const { planets } = data
const router = express.Router()

const getAllPlanets = async(_req: Request, res: Response) => {
  void res.status(200).json(planets)
}

router.get('/', getAllPlanets)

export { getAllPlanets, router }
