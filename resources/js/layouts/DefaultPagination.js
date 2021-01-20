import React from 'react'
import PaginationLayout from '@morningtrain/react-filters/PaginationLayout'

export default class DefaultPagination extends PaginationLayout {
  renderPageButtons () {
    const seperator = (<span className='pagination-item seperator'>...</span>)

    return this.pageButtons.map((page, index) => {
      const classes = this.state.page === page
        ? 'active pagination-item button small'
        : 'pagination-item button small'

      const button = (<button key={index} className={classes} onClick={() => this.changePage(page)}>{page}</button>)

      const next = this.pageButtons[index + 1]

      if (typeof next === 'undefined' || next === page + 1) return button

      return (
        <React.Fragment key={index}>
          {button}
          {seperator}
        </React.Fragment>
      )
    })
  }

  render () {
    if (!this.shouldRender) return null

    const prevClass = this.state.page === 1 ? 'button--disabled' : ''
    const nextClass = this.state.page === this.state.pages ? 'button--disabled' : ''

    return (
      <div className='default-app-pagination pagination'>
        <button className={['button', 'small', 'button--pink', prevClass].filter(c => c).join(' ')} onClick={this.prev}>
          Forrige side
        </button>
        <div className='pagination-inner'>
          {this.renderPageButtons()}
        </div>
        <button className={['button', 'small', 'button--pink', nextClass].filter(c => c).join(' ')} onClick={this.next}>
          Næste side
        </button>
      </div>
    )
  }
}
