"use strict"

let express = require('express')
let http = require('http')
let fs = require('fs')
let app = express()

let port = process.env.PORT ? +(process.env.PORT) : 3001
let default_host = process.env.HOST ? process.env.HOST : '10.0.0.219:80'
let endpoint = process.env.ENDPOINT ? process.env.ENDPOINT : `http://${default_host}/api/v2`
let ssoUrl = process.env.SSOURL ? process.env.SSOURL : `http://${default_host}/sso/index.php?redirect=${endpoint}/login/sso`

app.get('/dist/app.config.js', (req, res, next) => {
  fs.readFile(`${__dirname}/dist/app.config.js`, 'utf8', (err, data) => {
    if (err) { console.dir(err); next(err); return; }
    res.contentType('application/javascript').send(
      data.replace('$$endpoint$$', `${endpoint}`)
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
  parent.use(app)

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
