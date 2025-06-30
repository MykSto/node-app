const launchesMap = new Map()

let latestFlightNumber = 100

type Launch = Record<string, string | number | Date | string[] | boolean>

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true
} satisfies Launch

launchesMap.set(launch.flightNumber, launch)

const getAllLaunches = () => {
  return Array.from(launchesMap.values())
}

const abortLaunch = (launchId: number) => {
  const aborted = launchesMap.get(launchId)

  aborted.upcoming = false
  aborted.success = false

  return aborted
}

const launchExists = (id: number) => {
  return {
    exists: launchesMap.has(id),
    id
  }
}

const validationHandler = (launch: Launch) => {

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
    status: 200,
    body: {}
  }
}

const addLaunch = (launch: Launch) => {

  latestFlightNumber++

  launchesMap.set(
    latestFlightNumber,
    Object.assign(launch,{
      flightNumber: latestFlightNumber,
      customer: ['ZTM', 'NASA'],
      upcoming: true,
      success: true
    }))

}

export {
  getAllLaunches,
  addLaunch,
  launchExists,
  abortLaunch,
  validationHandler
}
