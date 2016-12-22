"use strict"

let express = require('express')
let http = require('http')
let fs = require('fs')
let app = express()

let endpoint = process.env.ENDPOINT ? process.env.ENDPOINT : 'http://127.0.0.1:3000'
let ssoUrl = process.env.SSOURL ? process.env.SSOURL : 'http://127.0.0.1:3000/sso'
app.get('/dist/app.config.js', (req, res, next) => {
  fs.readFile(`${__dirname}/dist/app.config.js`, 'utf8', (err, data) => {
    if (err) { console.dir(err); next(err); return; }
    res.contentType('application/javascript').send(
      data.replace('$$endpoint$$', `${endpoint}/api/v2`)
        .replace('$$ssourl$$', `${ssoUrl}`)
    )
  })
})

app.use('/scripts', express.static(`${__dirname}/scripts`))
app.use('/styles', express.static(`${__dirname}/styles`))
app.use('/node_modules', express.static(`${__dirname}/node_modules`))
app.use('/dist', express.static(`${__dirname}/dist`))
app.use((req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

var options = {
  key: fs.readFileSync(__dirname + '/server.key'),
  cert: fs.readFileSync(__dirname + '/server.crt')
}

var server = http.createServer(app)

console.log('Starting web server...')
server.listen(3001, err => {
  if (err) {
    console.error(err)
    return process.exit(1)
  } else {
    console.log('Listening...')
  }
})
