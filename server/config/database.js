const { success, error } = require('consola')
const mongoose = require('mongoose')
const config = require('config')
const dbConfig = config.get('dbConfig')
const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

let mongoURI = ''

if (
  config.has('dbConfig.user') &&
  config.has('dbConfig.password') &&
  config.has('dbConfig.host') &&
  config.has('dbConfig.dbName')
) {
  mongoURI = `mongodb+srv://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.dbName}?retryWrites=true&w=majority`
}

class Database {
  constructor() {
    this._connect()
  }

  // 连接数据库
  async _connect() {
    try {
      await mongoose.connect(mongoURI, dbOptions)

      success({
        message: 'Database connection successful',
        badge: true
      })
    } catch (err) {
      error({
        message: `Database connection error: ${err}`,
        badge: true
      })
    }
  }
}

module.exports = new Database()
