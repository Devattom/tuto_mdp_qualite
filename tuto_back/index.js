const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const apiRoutes = require('./src/api/routes/contacts')

app.use(cors())
app.use(express.json());
app.use('/api', apiRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
