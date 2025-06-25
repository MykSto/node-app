import request from 'supertest'
import app from '../app'

describe('Planets API', () => {

  const launchApi = '/api/planets'

  it('should respond', async() => {
    const planetsResponse = await request(app).get(launchApi)

    expect(planetsResponse.status).toBe(200)
  })

  it('should return data', async() => {
    const planetsResponse = await request(app).get(launchApi)

    expect(planetsResponse.body).toEqual([])
  })
})
