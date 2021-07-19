const express = require('express')
const server = express()
const dotenv = require('dotenv')
const { router: Modules } = require('./routes')
const port = process.env.PORT || 3008
const { ConnectToDB } = require('./utils/db.util')
dotenv.config()
server.use(express.json())

server.get('/', (req, res) =>
  res.status(200).json({
    message: 'thought api',
  })
)

server.use('/api/', Modules)
server.listen(port, async () => {
  try {
    let { databaseUrl } = process.env
    await ConnectToDB(databaseUrl)
    console.log('connected to DB!')
  } catch (err) {
    console.log('issues connecting to db ' + err.message)
  } finally {
    console.log(`thought api running on ${port}`)
  }
})
