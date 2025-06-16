import { useMemo } from 'react'

const History = props => {
  const tableBody = useMemo(() => {
    return props.launches?.filter(launch => !launch.upcoming)
      .map(launch => {
        return <tr key={String(launch.flightNumber)}>
          <td>
            <span className={
              launch.success ? 'text-green-500' : 'text-red-500'
            }>█</span>
          </td>
          <td>{launch.flightNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.customers?.join(', ')}</td>
        </tr>
      })
  }, [props.launches])

  return <article id="history">
    <p>History of mission launches including SpaceX launches starting from the year 2006.</p>
    <table className='table-auto'>
      <thead>
        <tr>
          <th className='w-[2rem]'></th>
          <th className='w-[3rem]'>No.</th>
          <th className='w-[9rem]'>Date</th>
          <th>Mission</th>
          <th className='w-[7rem]'>Rocket</th>
          <th>Customers</th>
        </tr>
      </thead>
      <tbody>
        {tableBody}
      </tbody>
    </table>
  </article>
}

export default History
