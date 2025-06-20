const API_URL = 'http://localhost:9000/api'

async function httpGetPlanets() {
  return await fetch(`${API_URL}/planets`).then(res => {
    return res.json()
  })
}

async function httpGetLaunches() {
  return await fetch(`${API_URL}/launches`, {
    method: 'GET'
  })
    .then(res => {
      return res.json()
    })
    .then(res => res.sort((a: { flightNumber: number }, b: { flightNumber: number }) => {
      return a.flightNumber - b.flightNumber
    }))
}

async function httpSubmitLaunch(launch: { launchDate: Date; mission: FormDataEntryValue | null; rocket: FormDataEntryValue | null; target: FormDataEntryValue | null }) {
  return await fetch(`${API_URL}/launches`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(launch)
  }).catch(err => {
    return { ok: false, error: err }
  })
}

async function httpAbortLaunch(id: any) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch
}
