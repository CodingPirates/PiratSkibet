import React from 'react'
import CrudPage from '@morningtrain/react-crud/CrudPage'
import IndexTable from '@morningtrain/react-crud/layouts/index/IndexTable'
import * as Columns from 'support/columns'
import Link from 'widgets/navigation/Link'
import * as Actions from 'support/actions/backend'
import * as Filters from 'support/filters'

export default class Index extends CrudPage {
  get resourceName () {
    return 'backend.gamification.avatar_item'
  }

  get layout () {
    return IndexTable
  }

  get actions () {
    return (
      <div className='table-actions'>
        <Link route='backend.gamification.avatar_items.edit' label='Rediger' parameters={{ avatar_item: 'model:id' }} />
        <Actions.Delete />
      </div>
    )
  }

  /* get filters() {
        return [
            <React.Fragment>
                <Filters/>
            </React.Fragment>
        ];
    } */

  get columns () {
    return (
      <>
        <Columns.AvatarItem label='Eksempel' />
        <Columns.Enum name='category' enum='avatar_category' label='Kategori' />
        <Columns.Text name='name' label='Navn' />
        <Columns.Boolean name='is_public' label='Kan ses af alle?' trueText='Ja' falseText='Nej' />
        <Columns.Boolean name='is_default' label='Er i standard avatar?' trueText='Ja' falseText='Nej' />
        <Columns.Boolean name='is_featured' label='Er fremhævet?' trueText='Ja' falseText='Nej' />
      </>
    )
  }

  renderBeforeCrud () {
    return (
      <>
        <Link route='backend.gamification.avatar_items.create' label='Opret avatar element' className='button button--yellow' />
      </>
    )
  }
}
