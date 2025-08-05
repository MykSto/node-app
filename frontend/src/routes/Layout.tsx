import { Routes, Route } from 'react-router'

import usePlanets from '../hooks/usePlanets'
import useLaunches from '../hooks/useLaunches'

import Header from '../components/Header'

import Launch from './Launch'
import History from '../components/History'
import Upcoming from './Upcoming'
import Login from './Login'

const Layout = ({ user }: { user: { verified: boolean, url: string } }) => {

  const planets = usePlanets()
  const { launches, submitLaunch, isPendingLaunch, abortLaunch, error } = useLaunches()

  return (
    <div className='main-content'>
      {user?.verified ? <Header /> : ''}
      <Routes>
        <Route path="/login" element={<Login url={user?.url} />} />
        <Route path="/" element={<p>HOME</p>}>
          Home
        </Route>
        <Route path="/launch" element={
          <Launch
            error={error}
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
            entered={false}
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
  )

}

export default Layout
