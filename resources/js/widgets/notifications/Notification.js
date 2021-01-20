import Widget from 'widgets/Widget'
import { inject } from '@morningtrain/react-decorators'
import Link from 'widgets/navigation/Link'
import Resources from '@morningtrain/resources'
import debounce from 'lodash/debounce'

export class Notification extends Widget {
  constructor (props) {
    super(props)

    this.read = debounce(this.read.bind(this), 500)
    this.state = {
      markedAsRead: false
    }
  }

  get baseClass () {
    return 'notification'
  }

  get model () {
    return this.props.model
  }

  get data () {
    return this.model.get('data')
  }

  get unread () {
    return this.state.markedAsRead
      ? false
      : this.model.get('read_at') === null
  }

  get className () {
    return this.unread
      ? `${this.baseClass} ${this.baseClass}--unread`
      : this.baseClass
  }

  get linkProps () {
    const { link, route, parameters } = this.data

    if (link && !route) return { href: link }

    return {
      route: route,
      parameters: parameters || {}
    }
  }

  get operation () {
    return Resources.make('api', 'notification').operation('markAsRead')
  }

  read () {
    if (!this.unread) return

    this.operation.execute({ database_notification: this.model.get('id') })
      .then(res => {
        this.setState({ markedAsRead: true })
      })
  }

  shouldRender () {
    const { only, except } = this.props
    const { type } = this.data

    // Blacklisting -> if type is not provided default to false
    if (except) return type ? !except.includes(type) : true

    // Whitelisting -> if type is not provided default to false
    if (only) return type ? only.includes(type) : false

    return false
  }

  render () {
    if (!this.shouldRender()) return null

    return (
      <li className={this.className} onMouseEnter={this.read}>
        <Link {...this.linkProps}>
          <div className={`${this.baseClass}__title`}>{this.data.title}</div>
          <div className={`${this.baseClass}__msg`}>{this.data.msg}</div>
        </Link>
      </li>
    )
  }
}

export default inject(['model'])(Notification)
