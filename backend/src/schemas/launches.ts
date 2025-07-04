import { Schema, model } from 'mongoose'

export interface LaunchTypes{
  flightNumber: number,
  mission: string,
  rocket: string,
  launchDate: Date,
  target: string,
  customers: string[],
  upcoming: boolean,
  success: boolean
}

const schema = {
  flightNumber: {
    type: Number, required: true
  },
  mission: {
    type: String, required: true
  },
  rocket: {
    type: String, required: true
  },
  launchDate: {
    type: Date, required: true
  },
  target: {
    type: String, required: true
  },
  customers: {
    type: [String], required: true
  },
  upcoming: {
    type: Boolean, required: true
  },
  success: {
    type: Boolean, required: true, default: true
  }
}

const launchSchema = new Schema(schema)

export default model('Launch', launchSchema)
