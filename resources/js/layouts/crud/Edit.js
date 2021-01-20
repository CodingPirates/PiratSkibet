import React from 'react'
import { Model } from '@morningtrain/react-resources'
import PropTypes from 'prop-types'
import * as Filters from 'support/filters'
import { Fieldset } from 'layouts'

export default class Edit extends React.Component {
  static get propTypes () {
    return {
      resourceName: PropTypes.string.isRequired
    }
  }

  static get defaultProps () {
    return {}
  }

  get routeParameterName () {
    return this.props.resourceName
  }

  render () {
    return (
      <Model resourceName={this.props.resourceName} submittable>
        <Filters.RouteParameter constraint={this.routeParameterName} />
        <Fieldset>
          {this.props.children}
        </Fieldset>
        <input type='submit' />
      </Model>
    )
  }
}
