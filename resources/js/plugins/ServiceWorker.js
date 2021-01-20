import Plugin from '@morningtrain/react-app/Plugin'

export default class ServiceWorker extends Plugin {
  boot (app) {
    if (!('serviceWorker' in navigator)) {
      console.log('!!!!!! browser doesnt support service workers')
      return Promise.resolve()
    }

    console.log('Will the service worker register?')

    return navigator.serviceWorker
      .register('service-worker.js')
      .then(function (reg) {
        console.log('Yes, it did.')
      })
      .catch(function (err) {
        console.log('No it didn\'t. This happened: ', err)
      })
  }
}
