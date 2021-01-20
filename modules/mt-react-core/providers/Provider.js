const React = require('react')
const { Provider } = require('mobx-react')
const shortid = require('shortid')

class BaseProvider extends React.Component {
  constructor (props) {
    super(props)

    this.provider_uuid = shortid.generate()
    this.state = { uuid: shortid.generate() }
  }

  updateUuid () {
    if (this.props.frozen !== true) {
      // console.log('Provider not frozen, updating', this);
      this.setState({ uuid: shortid.generate() })
    } else {
      // console.log('Provider frozen, dont update', this);
    }
  }

  /// //////////////////////////////
  // Statics
  /// //////////////////////////////

  static get propTypes () {
    return {}
  }

  static get defaultProps () {
    return {}
  }

  /// //////////////////////////////
  // Helpers
  /// //////////////////////////////

  get providerProps () {
    return {}
  }

  /// //////////////////////////////
  // Renderers
  /// //////////////////////////////

  render () { // new Error('provider props test'),
    // console.log( this.provider_uuid, this.providerProps);
    return (
      <Provider key={this.state.uuid} {...this.providerProps}>
        <>
          {this.props.children}
        </>
      </Provider>
    )
  }
}

module.exports = BaseProvider
