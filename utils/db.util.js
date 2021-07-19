const mongoose = require('mongoose')

const ConnectToDB = (url) =>
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

module.exports = { ConnectToDB }
