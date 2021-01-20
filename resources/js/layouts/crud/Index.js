import React from 'react'
import { Table, Collection } from '@morningtrain/react-resources'
import * as Filters from 'support/filters'
import PropTypes from 'prop-types'

export default class Index extends React.Component {
  static get propTypes () {
    return {
      resourceName: PropTypes.string.isRequired
    }
  }

  static get defaultProps () {
    return {

    }
  }

  renderColumns () {
    return this.props.children
  }

  renderFilters () {
    return this.props.filters
  }

  render () {
    return (
      <Collection resourceName={this.props.resourceName}>
        {this.renderFilters()}
        <Table>
          {this.renderColumns()}
        </Table>
        <Filters.Pagination />
      </Collection>
    )
  }
}
