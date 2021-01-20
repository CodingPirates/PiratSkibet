import React from 'react'
import CrudPage from '@morningtrain/react-crud/CrudPage'
import IndexTable from '@morningtrain/react-crud/layouts/index/IndexTable'
import * as Columns from 'support/columns'
import Link from 'widgets/navigation/Link'
import * as Actions from 'support/actions/backend'

export default class Index extends CrudPage {
  get resourceName () {
    return 'backend.gamification.achievement'
  }

  get layout () {
    return IndexTable
  }

  get actions () {
    return (
      <div className='table-actions'>
        <Link route='backend.gamification.achievements.edit' label='Rediger' parameters={{ achievement: 'model:id' }} />
        <Actions.Delete />
      </div>
    )
  }

  get columns () {
    return (
      <>
        <Columns.Text name='name' label='Navn' />
        <Columns.Text name='description' label='Beskrivelse' />
      </>
    )
  }

  renderBeforeCrud () {
    return (
      <>
        <Link route='backend.gamification.achievements.create' label='Opret achievement' className='button button--yellow' />
      </>
    )
  }
}
