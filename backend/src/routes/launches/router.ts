import express, { Request, Response } from 'express'
import data from './data'

const { addLaunch, data: launchData } = data
const router = express.Router()

const getLaunches = async (_req: Request, res: Response) => {
  void res.status(200).json(launchData)
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
  const requiredLength = launchKeys.length === requireKeys.length

  requireKeys.forEach(e => {
    if (match) {
      void res.status(400).json({
        error: `Properties not allowed: ${match}`
      })
    }

    if (!requiredLength && !launch[e]) {
      void res.status(400).json({
        error: `Missing property: ${e}`
      })
    } else if (requiredLength && launch[e]) {
      launch.launchDate = new Date(launch.launchDate)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if ((isNaN(launch.launchDate))) {
        void res.status(400).json({
          error: `Incorrect Date format: ${launch.launchDate}`
        })
      }

      addLaunch(launch)

      void res.status(201).json(launch)
    }
  })

}

router
  .get('/', getLaunches)
  .post('/', addNewLaunch)

export { addNewLaunch, getLaunches, router }
