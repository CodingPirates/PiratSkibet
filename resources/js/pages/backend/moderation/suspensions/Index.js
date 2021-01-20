import React from 'react'
import CrudPage from '@morningtrain/react-crud/CrudPage'
import IndexTable from '@morningtrain/react-crud/layouts/index/IndexTable'
import * as Columns from 'support/columns'
import * as Filters from 'support/filters'
import Link from 'widgets/navigation/Link'
import * as Actions from 'support/actions/backend'

export default class Index extends CrudPage {
  get resourceName () {
    return 'backend.moderation.user_suspension'
  }

  get layout () {
    return IndexTable
  }

  get constraints () {
    return (
      <>
        <Filters.Static constraint='active' value />
      </>
    )
  }

  get actions () {
    return (
      <div className='table-actions'>
        <Link route='backend.moderation.edit_suspension' label='Detaljer' parameters={{ user_suspension: 'model:id' }} />
        <Actions.Trigger label='Slet' operationName='deactivate' targetOperationName='index' />
      </div>
    )
  }

  get columns () {
    return (
      <>
        <Columns.Username name='user.username' label='Suspenderet Bruger' sort_slug='orderByUsername' />
        <Columns.Duration name='duration' label='Længde' unit='seconds' sort_slug='orderByDuration' />
        <Columns.Date name='start_at' label='Starttidspunkt' dateFormat='DD.MM.YYYY hh:mm:ss' />
        <Columns.Date name='end_at' label='Sluttidspunkt' dateFormat='DD.MM.YYYY hh:mm:ss' />
        <Columns.Username name='issuer.username' label='Issuer' />
      </>
    )
  }
}
