console.log("Hello world, lets spin the server up shall we?")
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/hi', (req, res) => {
    res.send('OMG YOU FOND THE OTHER PAGE!!')
  })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})