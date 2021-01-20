import React from 'react'
import CrudPage from '@morningtrain/react-crud/CrudPage'
import IndexTable from '@morningtrain/react-crud/layouts/index/IndexTable'
import * as Columns from 'support/columns'
import Link from 'widgets/navigation/Link'
import * as Actions from 'support/actions/backend'

export default class Index extends CrudPage {
  get resourceName () {
    return 'backend.gamification.user_title'
  }

  get layout () {
    return IndexTable
  }

  get actions () {
    return (
      <div className='table-actions'>
        <Link route='backend.gamification.user_titles.edit' label='Rediger' parameters={{ user_title: 'model:id' }} />
        <Actions.Delete />
      </div>
    )
  }

  get columns () {
    return (
      <>
        <Columns.Text name='title' label='Navn' />
      </>
    )
  }

  renderBeforeCrud () {
    return (
      <>
        <Link route='backend.gamification.user_titles.create' label='Opret bruger titel (rolle)' className='button button--yellow' />
      </>
    )
  }
}
