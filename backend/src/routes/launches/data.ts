import launches from '../../schemas/launches'
import planets from '../../schemas/planets'
import config from 'config'
import axios from 'axios'
import { RootFilterQuery } from 'mongoose'

const latestFlightNumber = 100
const spacexApi = config.get('spacex.url') as string

type Launch = Record<string, string | number | Date | string[] | boolean>

const findLaunch = async (filter: RootFilterQuery<{ flightNumber: number; mission: string; rocket: string; launchDate: NativeDate; target: string; customers: string[]; upcoming: boolean; success: boolean }> | undefined) => {
  return await launches.findOne(filter)
}

const populateData = async() => {

  console.info('Waiting for spacex to download...')

  const response = await axios.post(`${spacexApi}/launches/query`, {
    query : {},
    options: {
      pagination: false,
      pupulate: [
        {
          path: 'rocket',
          select: {
            name: 1
          }
        },
        {
          path: 'payloads',
          select: {
            'customers': 1
          }
        }
      ]
    }
  })
    .catch(() => { throw new Error('Spacex download failed') })
    .finally(() => console.info('Spacex download is finished'))

  const launchDocs = response.data.docs

  for (const launchDoc of launchDocs) {
    const playloads = launchDoc['payloads']
    const customers = playloads.flatMap((payload: Record<string, string[]>) => {
      return payload['customers']
    })

    const launch = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket']['name'],
      launchDate: launchDoc['date_local'],
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success'],
      customers
    }

    await saveLaunch(launch)
  }
}

export const getSpacexLaunches = async() => {
  const launchExists = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat'
  })

  if (launchExists) {
    console.log('Launch data already exists!')
  } else {
    await populateData()
  }

}

const getFlightNumber = async() => {
  const launch = await launches.findOne().sort('-flightNumber')

  if (!launch?.flightNumber) return latestFlightNumber

  return launch?.flightNumber
}

const saveLaunch = async (launch: Launch) => {
  return await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber
    }, launch, {
      upsert: true
    }
  )
}

export const getAllLaunches = async (skip: number, limit: number) => {
  return await launches
    .find({}, {
      '_id': 0, '__v': 0
    })
    .sort({
      flightNumber: 1
    })
    .skip(skip)
    .limit(limit)
}

export const abortLaunch = async (launchId: number) => {
  const launch = await launches.updateOne({
    flightNumber: launchId
  }, {
    upcoming: false,
    success: false
  })

  if (launch.modifiedCount !== 1 ) {
    return {
      status: 400,
      body: {
        error: 'Mission abort failed'
      }
    }
  }

  return {
    status: 200,
    body: {
      ok: true
    }
  }
}

export const launchExists = async(id: number) => {
  const launch = await findLaunch({
    flightNumber: id
  })

  return {
    exists: launch,
    id
  }
}

export const validationHandler = (launch: Launch) => {
  const requireKeys = ['mission', 'rocket', 'target', 'launchDate']
  const launchKeys = Object.keys(launch)

  const match = launchKeys.filter((e: string) => !requireKeys.includes(e)).join(', ')

  const missing = requireKeys.filter((e: string) => !launchKeys.includes(e)).join(', ')

  const empty = requireKeys.filter((e: string) => launchKeys.includes(e) && !launch[e as keyof typeof launch]).join(', ')

  const invalidDate = isNaN(launch.launchDate as unknown as number)

  if (empty) {
    return {
      status: 400,
      body: {
        error: `Empty properties: ${empty}`
      }
    }
  }

  if (match) {
    return {
      status: 400,
      body: {
        error: `Properties not allowed: ${match}`
      }
    }
  }

  if (missing) {
    return {
      status: 400,
      body: {
        error: `Missing properties: ${missing}`
      }
    }
  }

  if (!invalidDate) {
    launch.launchDate = new Date(launch.launchDate as string)

    return {
      status: 400,
      body: {
        error: `Incorrect Date format: ${launch.launchDate}`
      }
    }
  }

  return {
    status: 201,
    body: {}
  }
}

export const addLaunch = async(launch: Launch) => {
  const planet = await planets.findOne({
    keplerName: launch.target
  })

  if (!planet) {
    return {
      status: 404,
      body: {
        error: `Planet does not exist: ${launch.target}`
      }
    }
  }

  const newFlightNumber = await getFlightNumber() + 1

  const newLaunch = Object.assign(launch,{
    flightNumber: newFlightNumber,
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
  })

  await saveLaunch(newLaunch)
}
