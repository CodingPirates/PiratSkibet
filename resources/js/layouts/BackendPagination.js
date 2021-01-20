import React from 'react'
import PaginationLayout from '@morningtrain/react-filters/PaginationLayout'

export default class DefaultPagination extends PaginationLayout {
  render () {
    if (!this.shouldRender) return null

    const prevClass = this.state.page === 1 ? 'button--disabled' : 'active'
    const nextClass = this.state.page === this.state.pages ? 'button--disabled' : 'active'

    return (
      <div className='default-app-pagination pagination'>
        <button className={['pagination-item', 'prev', prevClass].filter(c => c).join(' ')} onClick={this.prev}>
          Forrige side
        </button>
        <div className='pagination-inner'>
          {this.renderPageButtons()}
        </div>
        <button className={['pagination-item', 'next', nextClass].filter(c => c).join(' ')} onClick={this.next}>
          Næste side
        </button>
      </div>
    )
  }
}
