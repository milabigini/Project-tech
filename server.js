const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hallo wereld Mila!!!!!! :) <3')
})

app.listen(3000)