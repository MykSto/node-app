import {
  Routes,
  Route
} from 'react-router'

import usePlanets from '../hooks/usePlanets'
import useLaunches from '../hooks/useLaunches'

// import Centered from '../components/Centered'
import Header from '../components/Header'
// import Footer from '../components/Footer'

import Launch from './Launch'
import History from '../components/History'
import Upcoming from './Upcoming'

const Layout = () => {

  const planets = usePlanets()
  const launches = useLaunches()

  console.log('asdasd', launches)

  return <div className='main-content'>
    <Header />
    <Routes>
      <Route path="/" element={<p>HOME</p>}>
        Home
      </Route>
      <Route path="/launch" element={<Launch data={planets} />}>
        Launch
      </Route>
      <Route path="/upcoming" element={<Upcoming launches={launches} />}>
        Upcoming
      </Route>
      <Route path="/history" element={<History/>}>
        History
      </Route>
    </Routes>
  </div>
}

export default Layout
