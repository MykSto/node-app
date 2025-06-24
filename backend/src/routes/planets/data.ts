import { parse } from 'csv-parse'
import fs from 'fs'
import path from 'path'

const planets: string[] = []

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isHabitablePlanet(planet: any) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36
    && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6
}

const loadPlanets = () => {
  return new Promise((res, rej) => {

    fs.createReadStream(path.join(__dirname, '../../../data/', 'kepler_data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true
      }))
      .on('data', data => {
        if (isHabitablePlanet(data)) {
          planets.push(data)
        }
      })
      .on('error', err => {
        console.log(err)
        rej(err)
      })
      .on('end', () => {
        res(console.log(`${planets.length} habitable planets found!`))
      })
  })
}

export default { loadPlanets, planets }
