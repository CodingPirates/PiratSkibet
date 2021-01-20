import React from 'react'
import { Trigger } from '@morningtrain/react-resources'
import RefreshOnSuccess from '@morningtrain/react-resources/src/RefreshOnSuccess'
import { inject } from '@morningtrain/react-decorators'

export default class TriggerAction extends React.Component {
  /// ///////////////////////////////
  /// Prop helpers
  /// ///////////////////////////////

  static get defaultProps () {
    return {
      operationName: null,
      targetOperationName: 'index',
      label: 'ACTION',
      className: 'button small button--pink',
      operationContext: {},
      modelKey: null
    }
  }

  get operationContext () {
    const context = { ...this.props.operationContext }

    if (this.props.modelKey !== null) {
      context[this.props.modelKey] = this.props.model.get(this.props.modelKey)
    }

    return context
  }

  /// ///////////////////////////////
  /// Rendering
  /// ///////////////////////////////

  renderBefore () {
    return null
  }

  renderAfter () {
    return null
  }

  render () {
    return (
      <Trigger {...this.props} operationContext={this.operationContext}>
        {this.renderBefore()}
        <RefreshOnSuccess operationName={this.props.targetOperationName} />
        {this.renderAfter()}
        {this.props.children}
      </Trigger>
    )
  }
}

export const Injected = inject(['model'])(TriggerAction)
