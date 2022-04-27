import { register } from 'register-service-worker'

register(process.env.SERVICE_WORKER_FILE, {
  ready () {
    console.log('Service worker is active.')
  },

  registered () {
    console.log('Service worker has been registered.')
  },

  cached () {
    console.log('Content has been cached for offline use.')
  },

  updatefound () {
    console.log('New content is downloading.')
  },

  updated () {
    console.log('New content is available; please refresh.')
  },

  offline () {
    console.log('No internet connection found. App is running in offline mode.')
  },

  error (error) {
    console.error('Error during service worker registration:', error)
  }
})