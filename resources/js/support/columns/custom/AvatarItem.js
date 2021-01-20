import React from 'react'
import Column from '@morningtrain/react-columns/base/Column'
import AvatarItem from 'services/avatar/AvatarItem'

export default class AvatarItemColumn extends Column {
  renderCellContent () {
    return (
      <div className='avatar_item_field_editor_preview tiny noborder'>
        <AvatarItem />
      </div>
    )
  }
}

export const Injected = AvatarItemColumn.inject()
