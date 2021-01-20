import React from 'react'
import Widget from 'widgets/Widget'
import { Collection, Iterator } from '@morningtrain/react-resources'
import * as Filters from 'support/filters'
import Breadcrumb from 'widgets/navigation/Breadcrumb'
import WhenCollection from 'support/conditionals/WhenCollection'

export default class Breadcrumbs extends Widget {
  static get defaultProps () {
    return {
      constraints: {}
    }
  }

  renderFilters () {
    let keys = Object.keys(this.props.constraints)

    if (keys.length > 0) {
      keys = keys.map(key => {
        return (
          <Filters.Static key={key} constraint={key} value={this.props.constraints[key]} />
        )
      })
    }

    return keys
  }

  renderWidget () {
    return (
      <div className='breadcrumbs'>
        <Collection resourceName={this.props.resourceName} operationName='breadcrumbs'>
          {this.renderFilters()}
          <WhenCollection empty={false}>
            <span className='breadcrumb-guide'>Du er her: </span>
            <Iterator>
              <Breadcrumb />
            </Iterator>
          </WhenCollection>
        </Collection>
      </div>
    )
  }
}
