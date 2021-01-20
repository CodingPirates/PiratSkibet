const React = require('react')

class Element extends React.Component {
  get defaultClassNames () {
  }

  get classNames () {
    const defs = this.defaultClassNames

    return this._concatClassList([
      ...(Array.isArray(defs) ? defs : [defs]),
      this.props.className || null
    ])
  }

  get columnsClass () {
    if (this.props.cols) {
      switch (this.props.cols) {
        case 1:
          return 'full-width'
        case 2:
          return 'two-cols'
        case 3:
          return 'three-cols'
        case 4:
          return 'four-cols'
      }
    }
    return 'full-width'
  }

  _concatClassList (list) {
    return list
      .filter(el => typeof el === 'string' && el.length > 0)
      .join(' ')
  }

  arrayToReact (arr, extra = {}) {
    return arr
      .filter(e => e) // Filter out falsy (null and undefined)
      .map((column, index) => {
        return React.cloneElement(column, {
          key: index,
          ...extra
        })
      })
  }
}

module.exports = Element
