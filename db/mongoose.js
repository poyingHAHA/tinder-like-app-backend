// this is a file for creating and connecting to database
const mongoose = require('mongoose')
const db_name = 'tinder_like_app_db'
const connectionURL = 'mongodb://127.0.0.1:27017/'+db_name

mongoose.connect(connectionURL).then(
  console.log("connected to database")
).catch(e => {
  console.log(e)
})
