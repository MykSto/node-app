import express, { Request, Response } from 'express'
import {
  addLaunch,
  getAllLaunches as launchData,
  launchExists,
  abortLaunch,
  validationHandler
} from './data'

import { pagination } from '../../utils/pagination'

const router = express.Router()

type Keys = 'mission' | 'rocket' | 'target' | 'launchDate'

interface Body extends Request { body: Record<Keys, string | Date> }

interface Limit extends Request { query: Record<string, string> }

const getLaunches = async (req: Limit,
  res: Response) => {

  const { skip, limit } = pagination(req.query)
  const launchList = await launchData(skip, limit)

  void res.status(200).json(launchList)
}

const deleteLaunch = async (req: Request, res: Response) => {
  const launchId = Number(req.params.id)

  const { exists, id } = await launchExists(launchId)

  if (!exists){
    void res.status(404).json({
      error: `Launch does not exist under: ${id}`
    })
  } else {
    const { body, status } = await abortLaunch(launchId)

    void res.status(status).json(body)
  }
}

const addNewLaunch = async (req: Body, res: Response) => {
  const launch = req.body
  const { status, body } = validationHandler(launch)

  if (body.error) {
    void res.status(status).json(body)
  } else {
    await addLaunch(launch)

    void res.status(status).json(launch)
  }
}

router
  .get('/', getLaunches)
  .post('/', addNewLaunch)
  .delete('/:id', deleteLaunch)

export {
  addNewLaunch, getLaunches, router
}
