import React from 'react'
import PaginationLayout from '@morningtrain/react-filters/PaginationLayout'

export default class SimplePagination extends PaginationLayout {
  render () {
    if (!this.shouldRender) return null

    const prevClass = this.state.page === 1
      ? 'disabled'
      : ''

    const nextClass = this.state.page === this.state.pages
      ? 'disabled'
      : ''

    return (
      <div className='simple-pagination'>
        <button className={['pagination-item prev', prevClass].filter(c => c).join(' ')} onClick={this.prev} />
        <button className={['pagination-item next', nextClass].filter(c => c).join(' ')} onClick={this.next} />
      </div>
    )
  }
}
