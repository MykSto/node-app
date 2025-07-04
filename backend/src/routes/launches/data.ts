import launches from '../../schemas/launches'
import planets from '../../schemas/planets'

const latestFlightNumber = 100

type Launch = Record<string, string | number | Date | string[] | boolean>

export const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true
} satisfies Launch

const getFlightNumber = async() => {
  const launch = await launches.findOne().sort('-flightNumber')

  if (!launch?.flightNumber) return latestFlightNumber

  return launch?.flightNumber
}

export const saveLaunch = async (launch: Launch) => {
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

  return {
    status: 201,
    body: await launches.findOneAndUpdate(
      {
        flightNumber: launch.flightNumber
      }, launch, {
        upsert: true
      }
    )
  }
}

export const getAllLaunches = async () => {
  return await launches.find({}, {
    _id: 0, '__v': 0
  })
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
  const launch = await launches.findOne({
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
  const newFlightNumber = await getFlightNumber() + 1

  const newLaunch = Object.assign(launch,{
    flightNumber: newFlightNumber,
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
  })

  await saveLaunch(newLaunch)
}
