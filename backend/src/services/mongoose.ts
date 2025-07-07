import mongoose from 'mongoose'

const MONGO_URL = `mongodb+srv://hushokas-api:${process.env.MONOG_PASS}@cluster0.ciaep03.mongodb.net/nasa?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connection.once('open', () => {
  console.log('MongoDB is ready')
})

mongoose.connection.on('error', err => {
  console.error('MongoDB error', err)
})

export const mongooseConnect = async() => await mongoose.connect(MONGO_URL)
