import { mongooseConnect } from './backend/src/services/mongoose'

beforeAll(async() => await mongooseConnect())
