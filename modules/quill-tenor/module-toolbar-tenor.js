import Quill from 'quill'
import ReactDOM from 'react-dom'
import ReactTenor from 'react-tenor'
import 'react-tenor/dist/styles.css'

const Delta = Quill.import('delta')
const Module = Quill.import('core/module')
let token = null
const tenor = null
let tenorOptions = {}

class ToolbarTenor extends Module {
  constructor (quill, options) {
    super(quill, options)

    this.quill = quill
    this.toolbar = quill.getModule('toolbar')
    tenorOptions = options

    token = options.apiKey

    if (typeof this.toolbar !== 'undefined') { this.toolbar.addHandler('tenor', this.checkPaletteExist) }

    const tenorBtns = document.getElementsByClassName('ql-tenor')

    if (tenorBtns) {
      [].slice.call(tenorBtns).forEach(function (tenorBtns) {
        tenorBtns.innerHTML = options.buttonIcon
      })
    }
  }

  checkPaletteExist () {
    const quill = this.quill
    fn_checkDialogOpen(quill)
    this.quill.on('text-change', function (delta, oldDelta, source) {
      if (source === 'user') {
        fn_close()
        fn_updateRange(quill)
      }
    })
  }
}

ToolbarTenor.DEFAULTS = {
  buttonIcon: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
        '\t viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">\n' +
        '\n' +
        '\t\t<g>\n' +
        '\t\t\t<path d="M146.286,146.286H36.571C14.629,146.286,0,164.571,0,182.857v146.286c0,18.286,14.629,36.571,36.571,36.571h109.714\n' +
        '\t\t\t\tc21.943,0,36.571-18.286,36.571-36.571V256H128v54.857H54.857V201.143h128v-18.286\n' +
        '\t\t\t\tC182.857,164.571,168.229,146.286,146.286,146.286z"/>\n' +
        '\t\t\t<polygon points="512,201.143 512,146.286 347.429,146.286 347.429,365.714 402.286,365.714 402.286,292.571 475.429,292.571 \n' +
        '\t\t\t\t475.429,237.714 402.286,237.714 402.286,201.143 \t\t\t"/>\n' +
        '\t\t\t<rect x="237.714" y="146.286" width="54.857" height="219.429"/>\n' +
        '\t\t</g>\n' +
        '</svg>\n'
}

function fn_close () {
  const ele_emoji_plate = document.getElementById('tenor-palette')
  document.getElementById('tenor-close-div').style.display = 'none'
  if (ele_emoji_plate) { ele_emoji_plate.remove() }
}

function fn_checkDialogOpen (quill) {
  const elementExists = document.getElementById('tenor-palette')
  if (elementExists) {
    elementExists.remove()
  } else {
    fn_showTenorPalatte(quill)
  }
}

function fn_updateRange (quill) {
  const range = quill.getSelection()
  return range
}

function fn_showTenorPalatte (quill) {
  const ele_area = document.createElement('div')
  const toolbar_container = document.querySelector('.ql-toolbar')

  const range = quill.getSelection()
  const atSignBounds = quill.getBounds(range.index)

  quill.container.appendChild(ele_area)

  ele_area.id = 'tenor-palette'
  ele_area.style.top = '0px'
  ele_area.style.left = '15px'
  ele_area.style.position = 'absolute'
  ele_area.style.zIndex = 999

  const tabToolbar = document.createElement('div')
  tabToolbar.id = 'tab-toolbar'
  ele_area.appendChild(tabToolbar)

  // panel
  const panel = document.createElement('div')
  panel.id = 'tab-panel'
  ele_area.appendChild(panel)
  const tabElementHolder = document.createElement('ul')
  tabToolbar.appendChild(tabElementHolder)

  if (document.getElementById('tenor-close-div') === null) {
    const closeDiv = document.createElement('div')
    closeDiv.id = 'tenor-close-div'
    closeDiv.setAttribute('style', 'width: 100%; height: 100%; position: fixed; top: 0; left: 0;')
    closeDiv.addEventListener('click', fn_close, false)
    document.getElementsByTagName('body')[0].appendChild(closeDiv)
  } else {
    document.getElementById('tenor-close-div').style.display = 'block'
  }

  const props = {
    token: token,
    autoFocus: true,
    contentFilter: tenorOptions.ContentFilter || 'off',
    mediaFilter: tenorOptions.MediaFilter || 'minimal',
    locale: tenorOptions.Locale || 'en_US',
    initialSearch: tenorOptions.InitialSearch || 'cat',
    searchPlaceholder: tenorOptions.SearchPlaceholder || 'Search Tenor',
    onSelect: result => {
      fn_embedTenorResult(quill, result)
    }
  }

  ReactDOM.render((<ReactTenor {...props} />), ele_area)

  fn_tenorPanelInit(panel, quill)
}

function fn_embedTenorResult (quill, result) {
  quill.focus()
  const range = fn_updateRange(quill)

  quill.insertEmbed(range.index, 'tenor', result, Quill.sources.USER)
  setTimeout(() => quill.setSelection(range.index + 1), 0)
  fn_close()
}

function fn_tenorPanelInit (panel, quill) {
  document.querySelector('.filter-people').classList.add('active')
}

function makeElement (tag, attrs, ...children) {
  const elem = document.createElement(tag)
  Object.keys(attrs).forEach(key => elem[key] = attrs[key])
  children.forEach(child => {
    if (typeof child === 'string') { child = document.createTextNode(child) }
    elem.appendChild(child)
  })
  return elem
}

export default ToolbarTenor
