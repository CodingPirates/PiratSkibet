import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { cookie, router, Env } from '@morningtrain/helpers'

class EchoHelper {
  constructor () {
    Pusher.logToConsole = true
  }

  setConnection () {
    if (this.user_id_at_connection === Env.get('user.id')) {
      return
    }

    const pusher_config = Env.get('broadcasting.pusher')

    this.user_id_at_connection = Env.get('user.id')

    this.connection = new Echo({
      authEndpoint: router.url('broadcasting/auth'),
      auth: {
        headers: {
          'x-xsrf-token': cookie.get('XSRF-TOKEN')
        }
      },
      broadcaster: 'pusher',
      key: pusher_config.key,
      cluster: pusher_config.cluster,
      encrypted: pusher_config.encrypted
    })
  }

  private (channel = 'user') {
    this.setConnection()

    const user_id = Env.get('user.id')

    return this.connection.private(`${channel}.${user_id}`)
  }

  channel (channel) {
    this.setConnection()

    return this.connection.channel(channel)
  }
}

const EchoInstance = new EchoHelper()

export default EchoInstance
