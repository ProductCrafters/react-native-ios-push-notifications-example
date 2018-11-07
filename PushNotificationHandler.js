import React, { Component } from 'react'
import { PushNotificationIOS, Alert } from 'react-native'

class PushNotificationHandler extends Component {
  componentDidMount() {
    console.log('component did mount')
    PushNotificationIOS.addEventListener('register', token => {
      console.log(token)
      Alert.alert(token)
    })

    PushNotificationIOS.addEventListener('registrationError', registrationError => {
      console.log(registrationError, '--')
    })

    PushNotificationIOS.addEventListener('notification', function(notification) {
      if (!notification) {
        return
      }
      const data = notification.getData()
      Alert.alert(JSON.stringify({ data, source: 'CollapsedApp' }))
    })

    PushNotificationIOS.getInitialNotification().then(notification => {
      if (!notification) {
        return
      }
      const data = notification.getData()
      Alert.alert(JSON.stringify({ data, source: 'ClosedApp' }))
    })
    PushNotificationIOS.requestPermissions()
  }

  render() {
    return null
  }
}

export default PushNotificationHandler
