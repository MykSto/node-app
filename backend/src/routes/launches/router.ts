import express, { Request, Response } from 'express'
import { addLaunch, getAllLaunches as launchData, launchExists, abortLaunch } from './data'

const router = express.Router()

const getLaunches = async (_req: Request, res: Response) => {
  void res.status(200).json(launchData())
}

const deleteLaunch = async (req: Request, res: Response) => {

  const launchId = Number(req.params.id)

  const { exists, id } = launchExists(launchId)

  if (!exists){
    void res.status(404).json({
      error: `Launch does not exist under: ${id}`
    })
  }

  const data = abortLaunch(launchId)

  void res.status(200).json(data)
}

type Keys = 'mission' | 'rocket' | 'target' | 'launchDate'

interface Body extends Request {
  body: Record<Keys, string | Date>
}

const addNewLaunch = (req: Body, res: Response) => {

  const launch = req.body
  const requireKeys = ['mission', 'rocket', 'target', 'launchDate'] as const

  const launchKeys = Object.keys(launch)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const match = launchKeys.filter((e: any) => !requireKeys.includes(e)).join(', ')
  const missing = requireKeys.filter((e: string) => !launchKeys.includes(e)).join(', ')
  const empty = requireKeys.filter((e: string) => launchKeys.includes(e) && e === '').join(', ')
  const invalidDate = isNaN(launch.launchDate as unknown as number)

  if (empty) {
    void res.status(400).json({
      error: `Empty properties: ${empty}`
    })
  }

  if (match) {
    void res.status(400).json({
      error: `Properties not allowed: ${match}`
    })
  }

  if (missing) {
    void res.status(400).json({
      error: `Missing properties: ${missing}`
    })
  }

  if (!invalidDate) {
    launch.launchDate = new Date(launch.launchDate)

    void res.status(400).json({
      error: `Incorrect Date format: ${launch.launchDate}`
    })
  }

  addLaunch(launch)
  void res.status(201).json(launch)
}

router
  .get('/', getLaunches)
  .post('/', addNewLaunch)
  .delete('/:id', deleteLaunch)

export { addNewLaunch, getLaunches, router }
