import { useMemo } from 'react'

type LaunchProps = {
  planets: Record<string, string>[]
  submitLaunch: (e: React.SyntheticEvent) => Promise<void>
  isPendingLaunch: boolean
}

const Launch: React.FC<LaunchProps> = ({ planets, submitLaunch, isPendingLaunch }) => {
  const selectorBody = useMemo(() => {
    return planets?.map(planet =>
      <option value={planet.kepler_name} key={planet.kepler_name}>{planet.kepler_name}</option>
    )
  }, [planets])

  const today = new Date().toISOString().split('T')[0]

  return (
    <div>
      <p>Schedule a mission launch for interstellar travel to one of the Kepler Exoplanets.</p>
      <p>Only confirmed planets matching the following criteria are available for the earliest scheduled missions:</p>
      <ul>
        <li>Planetary radius &lt; 1.6 times Earth's radius</li>
        <li>Effective stellar flux &gt; 0.36 times Earth's value and &lt; 1.11 times Earth's value</li>
      </ul>

      <form onSubmit={submitLaunch} style={{ display: 'inline-grid', gridTemplateColumns: 'auto auto', gridGap: '10px 20px' }}>
        <label htmlFor="launch-day">Launch Date</label>
        <input type="date" id="launch-day" name="launch-day" min={today} max="2040-12-31" defaultValue={today} />
        <label htmlFor="mission-name">Mission Name</label>
        <input type="text" id="mission-name" name="mission-name" />
        <label htmlFor="rocket-name">Rocket Type</label>
        <input type="text" id="rocket-name" name="rocket-name" defaultValue="Explorer IS1" />
        <label htmlFor="planets-selector">Destination Exoplanet</label>
        <select id="planets-selector" name="planets-selector">
          {selectorBody}
        </select>

        {isPendingLaunch ?
          <p>Loading...</p> :
          <button
            type="submit"
            disabled={isPendingLaunch}
          >
            Launch Mission ✔
          </button>
        }
      </form>
    </div>
  )

}

export default Launch
