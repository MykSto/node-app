import { useCallback, useEffect, useState } from 'react'

import { httpGetLaunches, httpSubmitLaunch, httpAbortLaunch } from './requests'

function useLaunches() {
  const [launches, saveLaunches] = useState([])

  const [isPendingLaunch, setPendingLaunch] = useState(false)

  const [error, setError] = useState('')

  const getLaunches = useCallback(async () => {
    const fetchedLaunches = await httpGetLaunches()

    saveLaunches(fetchedLaunches)
  }, [])

  useEffect(() => {
    getLaunches()
  }, [getLaunches])

  const submitLaunch = useCallback(async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setPendingLaunch(true)

    const data = new FormData(e.target as HTMLFormElement)
    const launchDate = new Date(data.get('launch-day') as string | number)
    const mission = data.get('mission-name')
    const rocket = data.get('rocket-name')
    const target = data.get('planets-selector')

    const response = await httpSubmitLaunch({
      launchDate,
      mission,
      rocket,
      target
    })

    const success = response.success

    if (success) {
      getLaunches()
      setTimeout(() => {
        setPendingLaunch(false)
      }, 800)
      setError('')
    } else {
      setError(response.error)
      throw Error('ERROR DURING THE SUBMIT')
    }
  }, [getLaunches])

  const abortLaunch = useCallback(async (id: number) => {
    const response = await httpAbortLaunch(id)

    const success = response.success

    if (!success) {
      getLaunches()
    } else {
      throw Error('ERROR DURING ABORT')
    }
  }, [getLaunches])

  return {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
    error
  }
}

export default useLaunches
