const API_URL = 'http://localhost:9000/api'

async function httpGetPlanets() {
  return await fetch(`${API_URL}/planets`).then(res => {
    return res.json()
  })
}

async function httpGetLaunches() {
  return await fetch(`${API_URL}/launches`)
    .then(res => {
      return res.json()
    })
    .then(res => res.sort((a, b) => {
      return a.flightNumber - b.flightNumber
    }))
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch
}
