const express = require('express')
const proxy = require('http-proxy-middleware')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

// Proxy api request
// Optional, if you don't want your add CORS support to your Django app
app.use(
  '/api',
  proxy({
    target: "http://closetmap.herokuapp.com",
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      '^/api': '',
    },
  })
)

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => console.log(`Listening on :${PORT}`))
