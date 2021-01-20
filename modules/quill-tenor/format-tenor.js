import Quill from 'quill'

const Embed = Quill.import('blots/embed')

class TenorBlot extends Embed {
  static create (value) {
    const node = super.create()
    if (typeof value === 'object') {
      TenorBlot.buildSpan(value, node)
    } else if (typeof value === 'string') {
      const valueObj = value
      if (valueObj) {
        TenorBlot.buildSpan(valueObj, node)
      }
    }

    return node
  }

  static value (node) {
    return { src: node.dataset.src, id: node.dataset.id }
  }

  static buildSpan (value, node) {
    value.src = value.src || value.media[0].gif.url

    node.setAttribute('data-id', value.id)
    node.setAttribute('data-src', value.src)
    const tenorElement = document.createElement('img')

    tenorElement.setAttribute('src', value.src)

    node.appendChild(tenorElement)
  }

  static parseUnicode (string) {
    return string.split('-').map(str => parseInt(str, 16))
  }
}

TenorBlot.blotName = 'tenor'
TenorBlot.className = 'ql-tenorblot'
TenorBlot.tagName = 'span'
TenorBlot.emojiClass = 'ap'
TenorBlot.emojiPrefix = 'ap-'

export default TenorBlot
