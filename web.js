const express = require('@feathersjs/express')
const feathers = require('@feathersjs/feathers')
const service = require('feathers-memory')
const socketio = require('@feathersjs/socketio')

const config = require('./config')
const app = express(feathers())

// http
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.configure(express.rest())

// ws
app.configure(socketio())

// services
app.use('/messages', service())

// channels
app.configure(function (app) {
  app.on('connection', connection => {
    app.channel('anonymous').join(connection)
  })
  app.publish((data, hook) => {
    return app.channel('anonymous')
  })
})

// serve static files to browser
app.use((req, res, next) => {
  res.cookie('config', JSON.stringify(config.client))
  next()
})
app.use(express.static('browser'))

// fancy error page
app.use(express.errorHandler())

const { port, url } = config.web
app.listen(port, () => {
  console.log(`feathers-worker web server started on ${url}`)
})
