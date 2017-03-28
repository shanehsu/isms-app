"use strict"

let express = require('express')
let http = require('http')
let fs = require('fs')
let app = express()

let port = process.env.PORT ? +(process.env.PORT) : 8080
let default_host = process.env.HOST ? process.env.HOST : 'changhua.shanehsu.idv.tw'
let endpoint = process.env.ENDPOINT ? process.env.ENDPOINT : `https://${default_host}`
let ssoUrl = process.env.SSOURL ? process.env.SSOURL : `https://${default_host}/sso`

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
  // key: fs.readFileSync(__dirname + '/server.key'),
  // cert: fs.readFileSync(__dirname + '/server.crt')
}

module.exports = {
  app: app
}

if (require.main === module) {
  let parent = express()
  parent.use('/app', app)

  var server = http.createServer(parent)
  server.listen(port, err => {
    if (err) {
      console.error(err)
      return process.exit(1)
    } else {
      console.log(`開始監聽 ${port}`)
    }
  })
}
