console.log("Hello world, lets spin the server up shall we?")
const express = require('express')
const app = express()
const port = 3000

//app.get kiest wat je bij welke url te zien krijgt.
app.get('/', (req, res) => {
  res.send('Hi there, welcome!')
})
app.get('/hi', (req, res) => {
    res.send('OMG YOU FOND THE OTHER PAGE!!')
})

//app.use laat weten welke mappen er middels urls toegangelijk zijn.
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`BTapp listening at http://localhost:${port}`)
})