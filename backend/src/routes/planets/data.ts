import { parse } from 'csv-parse'
import fs from 'fs'
import path from 'path'
import planets from '../../schemas/planets'

type DataType = {
  kepler_name: string
}

function isHabitablePlanet(planet: any) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36
    && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6
}

export const loadPlanets = () => {
  return new Promise((res, rej) => {

    fs.createReadStream(path.join(
      __dirname, '../../../data/', 'kepler_data.csv'
    ))
      .pipe(parse({
        comment: '#',
        columns: true
      }))
      .on('data', async data => {
        if (isHabitablePlanet(data)) {
          await savePlanets(data)
        }
      })
      .on('error', err => {
        console.log(err)
        rej(err)
      })
      .on('end', async() => {
        const planetLenght = (await getPlanets()).length

        res(console.log(`${planetLenght} habitable planets found!`))
      })
  })
}

export const getPlanets = async() => {
  return await planets.find({}, {
    '_id': 0, '__v': 0
  })
}

export const savePlanets = async (data: DataType) => {
  try {
    await planets.updateOne(
      {
        keplerName: data.kepler_name
      }, {
        keplerName: data.kepler_name
      }, {
        upsert: true
      }
    )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Could not save planet', error)
  }

}
