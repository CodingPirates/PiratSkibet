import React from 'react'
import Field from '@morningtrain/react-fields/base/Field'
import Value from '@morningtrain/react-fields/simpletons/Value'

export default class SelectBoxes extends Field {
  constructor (props) {
    super(props)

    this.state = {
      ...this.state

    }
  }

  get templates () {
    const templates = React.Children.toArray(this.props.children)

    if (templates.length > 0) return templates

    return [<Value />]
  }

  renderBoxes () {
    return this.options.map((option, i) => {
      const props = {
        key: i,
        ...option,
        selected: this.props.current_value === option.value,
        onClick: () => this._onChange(option.value)
      }

      return this.templates.map((template, j) => {
        return React.cloneElement(template, { key: j, ...props })
      })
    })
  }

  renderField () {
    return (
      <>
        <input type='hidden' name={this.props.name} value={this.state.value} />
        <div className='select-box-wrap'>
          {this.renderBoxes()}
        </div>
      </>
    )
  }
}
