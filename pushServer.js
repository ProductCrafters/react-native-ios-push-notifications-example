const apn = require('apn')
const path = require('path')
const _ = require('lodash')

const certPath = path.resolve(__dirname) + '/ios_development.cer'

class Notification {
  constructor(settings) {
    try {
      this.engine = new apn.Provider(settings)
    } catch (e) {
      console.error('Invalid APN params', e)
    }
  }

  sendNotification(deviceToken, message, payload = {}, params = {}) {
    const defaultParams = {
      badge: 3,
      expiry: Math.floor(Date.now() / 1000) + 3600,
      topic: params.topic,
    }

    if (!this.engine) {
      throw new Error('No apn connection')
    }
    const notificationMessage = new apn.Notification(payload)
    notificationMessage.alert = message

    _.each(Object.assign(defaultParams, params), (v, k) => {
      notificationMessage[k] = v
    })

    return this.engine.send(notificationMessage, deviceToken)
  }
}

const [nodePath, script, keyId, teamId, token, appId, message] = process.argv
if (!keyId || !teamId || !token || !appId || !message) {
  console.log('Please add params to script [keyId, teamId, token, appId, message]')
  process.exit(1)
}

const options = {
  token: {
    key: certPath,
    keyId,
    teamId,
  },
  production: false,
}

const notification = new Notification(options)
notification
  .sendNotification(
    token,
    message,
    {},
    {
      topic: appId,
    }
  )
  .then((e, f) => {
    console.log(e, f)
    process.exit(1)
  })
  .catch(er => {
    console.log(er)
    process.exit(1)
  })
