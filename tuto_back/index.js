const express = require('express')
const app = express()
const port = 3001
const apiRoutes = require('./src/api/routes/contacts')
const { Sequelize } = require('sequelize')


app.use('/api', apiRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
