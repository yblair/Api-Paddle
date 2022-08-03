require('dotenv')
const { DATABASE_URL } = process.env
const mongoose = require('mongoose')

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log('Database connected')
  })
  .catch((e) => {
    console.log(e)
  })