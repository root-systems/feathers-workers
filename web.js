const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')
const socketio = require('@feathersjs/socketio')

const config = require('./config')
const app = express(feathers())

// http
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.configure(express.rest())

// ws
app.configure(socketio())

// serve static files to browser
app.use((req, res, next) => {
  res.cookie('config', JSON.stringify(config.client))
  next()
})
app.use(express.static('browser'))

// fancy error page
app.use(express.errorHandler())

const { hostname, port } = config.web
app.listen(port, () => {
  console.log(`feathers-worker web server started on http://${hostname}:${port}`)
})
