const service = require('feathers-memory')

module.exports = function (app) {
  app.use('/messages', service())
  app.service('messages').hooks(hooks)
}

const hooks = {
  after: {
    create (context) {
      const queue = context.app.get('queue')
      const message = context.result
      queue.enqueue('feathers-workers', 'messagesExclaim', [message.text])
    }
  }
}
