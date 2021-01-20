import { router } from '@morningtrain/helpers'

const Filter = require('./base/Filter')

export default class RouteParameterFilter extends Filter {
  constructor (props) {
    super(props)

    const value = router.parameter(this.parameter)

    if (value !== null) {
      this.constrain(value)
    }
  }

  get parameter () {
    if (this.props.parameter) {
      return this.props.parameter
    }

    return this.constraint
  }

  /// //////////////////////////////
  // Rendering
  /// //////////////////////////////

  render () {
    return null
  }
}

export const Injected = RouteParameterFilter.inject()
