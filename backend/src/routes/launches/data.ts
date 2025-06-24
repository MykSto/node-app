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
  abortLaunch
}
