import express, { Request, Response } from 'express'
import { getPlanets } from './data'

const router = express.Router()

const getAllPlanets = async(_req: Request, res: Response) => {
  void res.status(200).json(await getPlanets())
}

router.get('/', getAllPlanets)

export { getAllPlanets, router }
