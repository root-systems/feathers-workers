module.exports = function (app) {
  app.configure(require('./messages/service'))
}
