import { Schema, model } from 'mongoose'

const schema = {
  keplerName: {
    type: String,
    required: true
  }
} as const

const planetsSchema = new Schema(schema)

export default model('Planets', planetsSchema)
