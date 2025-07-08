import mongoose from 'mongoose'
import config from 'config'

const mongoUrl = config.get('mongodb.url') as string

mongoose.connection.once('open', () => {
  console.log('MongoDB is ready')
})

mongoose.connection.on('error', err => {
  console.error('MongoDB error', err)
})

export const mongooseConnect = async() => await mongoose.connect(mongoUrl)
