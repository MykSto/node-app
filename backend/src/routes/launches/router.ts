import{ Request, Response } from 'express'
import launches from './data'

const getLaunches = async(_req: Request, res: Response) => {

  const data = Array.from(launches.values())

  void res.status(200).json(data)
}

export default getLaunches
