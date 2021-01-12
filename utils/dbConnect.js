import mongoose from 'mongoose'

mongoose.set('useCreateIndex', true)

// V1:
// const connection = {}

// async function dbConnect() {
//   if (connection.isConnected) return
//   const db = await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   connection.isConnected = db.connections[0].readyState
// }

// export default dbConnect

// V2:
class MongooseClientSingletone {
  static _instance = new MongooseClientSingletone()
  constructor() {
    if (!!MongooseClientSingletone._instance) {
      throw new Error('Instantiation failed: use MongooseClientSingletone.getInstance() instead of new.')
    }
    this._connect()
  }
  async _connect() {
    mongoose.Promise = Promise
    // mongoose.connect(this.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    mongoose.connection.once('open', () => {
      // eslint-disable-next-line no-console
      console.log('🔥 Connected to MongoDB 🔥')
    })
  }
  static getInstance() {
    return MongooseClientSingletone._instance
  }
}

const mongooseClient = MongooseClientSingletone.getInstance
export default mongooseClient
