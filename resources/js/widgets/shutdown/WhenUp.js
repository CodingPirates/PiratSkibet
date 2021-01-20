import ShutdownBase from 'widgets/shutdown/ShutdownBase'

export default class WhenUp extends ShutdownBase {
  renderWidget () {
    if (this.isDown) {
      return null
    }

    return this.props.children
  }
}
