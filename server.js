console.log("Hello world, lets spin the server up shall we?")
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
let bodyParser = require('body-parser')
// var songData = require('./public/scripts/addSong.js')
// console.log(songData)


app.set('view enigine', 'ejs')
app.set('views', 'views')

app.use(express.static('public'))

//app.get kiest wat je bij welke url te zien krijgt.
app.get('/', (req, res) => {
  
    res.render('index.ejs', {data : {name: "Djescho"}})
    
    
  })
app.get('/profile', (req, res) => {
    res.render('profile.ejs')
})
app.get('/search', (req, res) => {
  res.render('search.ejs')
})


app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })

//app.use laat weten welke mappen er middels urls toegangelijk zijn.
app.post('/profile', (req, res) => {
  console.log("sonething has ben submited!")
})

app.listen(port, () => {
  console.log(`BTapp listening at http://localhost:${port}`)
})
