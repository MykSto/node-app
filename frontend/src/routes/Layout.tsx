import {
  Routes,
  Route
} from 'react-router'

import usePlanets from '../hooks/usePlanets'
import useLaunches from '../hooks/useLaunches'

import Header from '../components/Header'
// import Footer from '../components/Footer'

import Launch from './Launch'
import History from '../components/History'
import Upcoming from './Upcoming'

const Layout = () => {

  const planets = usePlanets()
  const { launches, submitLaunch, isPendingLaunch, abortLaunch } = useLaunches()

  return <div className='main-content'>
    <Header />
    <Routes>
      <Route path="/" element={<p>HOME</p>}>
        Home
      </Route>
      <Route path="/launch" element={
        <Launch
          planets={planets}
          submitLaunch={submitLaunch}
          isPendingLaunch={isPendingLaunch}
        />
      }>
        Launch
      </Route>
      <Route path="/upcoming" element={
        <Upcoming
          launches={launches}
          abortLaunch={abortLaunch}
          entered={''}
        />
      }>
        Upcoming
      </Route>
      <Route path="/history" element={
        <History launches={launches}
        />
      }>
        History
      </Route>
    </Routes>
  </div>
}

export default Layout
