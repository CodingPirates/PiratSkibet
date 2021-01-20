import Quill from 'quill'
import FormatTenor from './format-tenor'
import ToolbarTenor from './module-toolbar-tenor'

Quill.register({
  'formats/tenor': FormatTenor,
  'modules/tenor-toolbar': ToolbarTenor
}, false)

export default { ToolbarTenor, FormatTenor }
