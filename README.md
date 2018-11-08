# React-Native iOS Push-Notifications sample
This repo contains:
 1. A sample React Native iOs app (`react-native 0.57.2`)
 2. Server-side script to send the push-notification to the iOS app.

## How to use it
1. Clone the repo
2. Create a developer certificate according to the article
3. Build & launch sample iOS app. Allow push notification permission. You will get device *token* for APN in Alert and console.log. Store it.
3. Download it and put it in repo's root folder under `ios_development.cer`
4. Get your *teamId*, *keyId* and *appId* according to the original article on Medium.
5. Pass these params together with token to the `pushServer.js`:
`node pushServer.js keyId teamId token appId message`
