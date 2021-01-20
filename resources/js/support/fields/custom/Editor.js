import React from 'react'
import { default as EditorField } from '@morningtrain/react-fields/simpletons/Editor'

/* import * as Quill from "quill";
var Block = Quill.import('blots/block');
Block.tagName = 'DIV';
Quill.register(Block, true); */

export default class Editor extends EditorField {
  get quillToolbarOptions () {
    if (this.props.simple === true) {
      return [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['link'],
        [{ color: [] }, { background: [] }] // dropdown with defaults from theme
      ]
    }

    return [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],

      ['clean'] // remove formatting button
    ]
  }
}

export const Injected = Editor.inject()
