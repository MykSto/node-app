import request from 'supertest'
import app from '../app'

describe('Launches API', () => {

  const launchApi = '/api/launches'
  const launchDeleteApi = '/api/launches/100'

  it('should respond', async() => {
    const planetsResponse = await request(app).get(launchApi)

    expect(planetsResponse.status).toBe(200)
  })

  it('should return data', async() => {
    const planetsResponse = await request(app).get(launchApi)

    expect(planetsResponse.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        'customers': [
          'ZTM',
          'NASA'
        ],
        'flightNumber': 100,
        'launchDate': '2030-12-26T23:00:00.000Z',
        'mission': 'Kepler Exploration X',
        'rocket': 'Explorer IS1',
        'success': true,
        'target': 'Kepler-442 b',
        'upcoming': true
      })
    ]))
  })

  describe('should send data', () => {
    it('and return data', async () => {
      const planetsResponse = await request(app)
        .post(launchApi)
        .send({
          'mission': 'asdasd',
          'target': 'sdsd',
          'rocket' : '2323',
          'launchDate': '10 December, 2020'
        })

      expect(planetsResponse.body).toMatchObject({
        'customers': [
          'ZTM',
          'NASA'
        ],
        'flightNumber': 115,
        'launchDate': '10 December, 2020',
        'mission': 'asdasd',
        'rocket': '2323',
        'success': true,
        'target': 'sdsd',
        'upcoming': true
      })
    })

    describe('and return error', () => {
      it('with missing property', async() => {
        const planetsResponse = await request(app)
          .post(launchApi)
          .send({
            'mission': 'asdasd',
            'target': 'sdsd',
            'rocket' : '2323'
          })

        expect(planetsResponse.status).toBe(400)
        expect(planetsResponse.body).toMatchObject({
          error: 'Missing properties: launchDate'
        })
      })

      it('with empty property', async() => {
        const planetsResponse = await request(app)
          .post(launchApi)
          .send({
            'mission': '',
            'rocket': '',
            'target' : '',
            'launchDate': ''
          })

        expect(planetsResponse.status).toBe(400)
        expect(planetsResponse.body).toMatchObject({
          error: 'Empty properties: mission, rocket, target, launchDate'
        })
      })

      it('with invalid date', async() => {
        const planetsResponse = await request(app)
          .post(launchApi)
          .send({
            'mission': 'test',
            'target': 'test',
            'rocket' : 'test',
            'launchDate': '234234234'
          })

        expect(planetsResponse.status).toBe(400)
        expect(planetsResponse.body).toMatchObject({
          error: 'Incorrect Date format: Invalid Date'
        })
      })

      it('with not allowed property', async() => {
        const planetsResponse = await request(app)
          .post(launchApi)
          .send({
            'mission': 'asdasd',
            'target': 'sdsd',
            'rocket' : '2323',
            'test': 'test'
          })

        expect(planetsResponse.status).toBe(400)
        expect(planetsResponse.body).toMatchObject({
          error: 'Properties not allowed: test'
        })
      })
    })
  })

  describe('should delete data', () => {
    it('with aborted flight', async() => {
      const planetsResponse = await request(app).delete(launchDeleteApi)

      expect(planetsResponse.body).toEqual(expect.objectContaining({
        'ok': true
      }))
    })

    it('with error', async() => {
      const planetsResponse = await request(app).delete('/api/launches/20202020')

      expect(planetsResponse.body).toStrictEqual({
        error: 'Launch does not exist under: 20202020'
      })
    })

  })

})
