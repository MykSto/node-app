import { useCallback, useMemo, useState } from 'react'

import { httpGetPlanets } from './requests'
function usePlanets() {
  const [planets, savePlanets] = useState([])

  const getPlanets = useCallback(async () => {
    const fetchedPlanets = await httpGetPlanets()

    savePlanets(fetchedPlanets)
  }, [])

  useMemo(() => {
    getPlanets()

  }, [getPlanets])

  return planets
}

export default usePlanets
