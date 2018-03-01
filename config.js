const WEB_PORT = process.env.PORT || 3030
const WEB_HOST = process.env.WEB_HOST || 'localhost'
const WEB_URL = process.env.WEB_URL || `http://${WEB_HOST}:${WEB_PORT}`

var config = {
  web: {
    port: WEB_PORT,
    host: WEB_HOST,
    url: WEB_URL
  }
}

config.client = {
  web: config.web
}

module.exports = config
