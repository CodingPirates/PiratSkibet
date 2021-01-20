import React from 'react'

export default class TableList extends React.Component {
  get title () {
    return this.props.title
  }

  render () {
    return (
      <div className='custom-table'>
        <div className='custom-table__titlebar'>
          <div className='custom-table__title'>
            {this.title}
          </div>
          {this.props.titleRight}
        </div>
        <div className='custom-table__list'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
