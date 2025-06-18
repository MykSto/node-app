import{ Request, Response } from 'express'
import { data, addLaunch } from './data'

const getLaunches = async(_req: Request, res: Response) => {
  void res.status(200).json(data)
}

const addNewLaunch = (req: Request, res: Response) => {
  const launch = req.body

  launch.launchDate = new Date(launch.launchDate)

  addLaunch(launch)

  void res.status(201).json(launch)
}

export { addNewLaunch, getLaunches }
