import React from 'react'
import * as Fields from 'support/fields'
import Filter from '@morningtrain/react-filters/Filter'

class ResourceFilter extends Filter {
  render () {
    const {
      children,
      namespace,
      resourceName,
      optionsKey,
      label,
      placeholder,
      operationName = 'index'
    } = this.props

    return (
      <Fields.ResourceSelector
        {...this.props}
        label={label}
        placeholder={placeholder}
        optionsKey={optionsKey}
        namespace={namespace}
        resourceName={resourceName}
        operationName={operationName}
        defaultValue={null}
        onChange={(e) => this.constrain(e)}
      >
        {children}
      </Fields.ResourceSelector>
    )
  }
}

export const Injected = ResourceFilter.inject()
