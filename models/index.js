const mongoose = require('mongoose')
const MONGODB_API_URI = 'mongodb://localhost:27017/addressbook'

const handleError = err => {
  console.error(err)
  console.error(`
    Couldn't connect to mongo database, stopping the server.
    Start Mongo server first and then start application server.`
  )
  process.exit(1)
}

module.exports = () => {
  const dbConnection = mongoose.connection

  // Register common events
  dbConnection.on('error', err => handleError(err))
  dbConnection.on('connected', console.log.bind(console, "Connected to Mongo DB running on localhost"))
  dbConnection.on('disconnected', console.log.bind(console, "Disconnected from Mongo DB instance running on localhost"))

  // Close the connection when server is terminated
  const gracefulExit = () => dbConnection.close(err => {
    if (err) console.error("Error closing Mongo connection ", err)
    else console.log("Connection to Mongo DB is closed")
    process.exit(0)
  })
  process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit)

  // Create a connection
  mongoose.connect(MONGODB_API_URI, { useNewUrlParser: true })
}
