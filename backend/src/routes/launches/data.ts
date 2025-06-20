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
const data = Array.from(launchesMap.values())

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

export default { data, addLaunch }
