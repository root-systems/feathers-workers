const WEB_PORT = process.env.PORT || 3030
const WEB_HOSTNAME = process.env.WEB_HOSTNAME || 'localhost'

var config = {
  web: {
    port: WEB_PORT,
    hostname: WEB_HOSTNAME
  }
}

config.client = {
  web: config.web
}

module.exports = config
