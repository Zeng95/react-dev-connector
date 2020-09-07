const mongoose = require('mongoose')
const dbConfig = require('config').get('dbConfig')
const mongoURI = `mongodb+srv://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.dbName}?retryWrites=true&w=majority`
const { success, error } = require('consola')

class Database {
  constructor() {
    this._connect()
  }

  async _connect() {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })

      success({ message: 'Database connection successful', badge: true })
    } catch (err) {
      error({ message: `Database connection error: ${err}`, badge: true })
    }
  }
}

module.exports = new Database()
