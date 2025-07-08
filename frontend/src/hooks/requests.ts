import config from 'config'

const API_URL = config.get('api.url')

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

async function httpSubmitLaunch(launch: { launchDate: Date;
  mission: FormDataEntryValue | null;
  rocket: FormDataEntryValue | null;
  target: FormDataEntryValue | null }) {
  return await fetch(`${API_URL}/launches`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(launch)
  })
    .then(res => {
      return res.json()
    })
    .catch(err => {
      return {
        ok: false, error: err
      }
    })
}

async function httpAbortLaunch(id: number) {
  return await fetch(`${API_URL}/launches/${id}`,{
    method: 'DELETE'
  })
    .then(res => {
      return res.json()
    })
    .catch(err => {
      return {
        ok: false, error: err
      }
    })
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch
}
