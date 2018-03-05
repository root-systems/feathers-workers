const express = require('@feathersjs/express')
const feathers = require('@feathersjs/feathers')
const service = require('feathers-memory')
const socketio = require('@feathersjs/socketio')
const Redis = require('ioredis')
const Resque = require('node-resque')

const config = require('./config')
const Services = require('./services')
const Jobs = require('./jobs')
const app = express(feathers())

async function setup () {
  // http
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.configure(express.rest())

  // ws
  app.configure(socketio())

  // connect to worker queue
  const queueConnection = { redis: new Redis(app.get('redis')) }
  const jobs = Jobs(config)
  const queue = new Resque.Queue({ connection: queueConnection }, jobs)
  await queue.connect()
  app.set('queue', queue)

  // services
  app.configure(Services)

  // channels
  app.configure(function (app) {
    app.on('connection', connection => {
      app.channel('anonymous').join(connection)
    })
    app.publish((data, hook) => {
      return app.channel('anonymous')
    })
  })

  app.use(express.static('browser'))

  // fancy error page
  app.use(express.errorHandler())

  // start web server
  const { port, url } = config.web
  app.listen(port, () => {
    console.log(`feathers-worker web server started on ${url}`)
  })
}

setup()

