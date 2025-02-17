require('dotenv').config();

const mongoose = require('./mongodb');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const ProfilesRoutes = require('./api/profiles/routes')

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/api', ProfilesRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port localhost:${port}`)
});
      
