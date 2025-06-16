import{ Request, Response } from 'express'
import data from './data'

const { planets } = data

const getAllPlanets = async(_req: Request, res: Response) => {
  void res.status(200).json(planets)
}

export default getAllPlanets
