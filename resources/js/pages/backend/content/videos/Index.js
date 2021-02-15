import React from 'react'
import CrudPage from '@morningtrain/react-crud/CrudPage'
import IndexTable from '@morningtrain/react-crud/layouts/index/IndexTable'
import * as Columns from 'support/columns'
import { inject } from '@morningtrain/react-decorators'
import Link from 'widgets/navigation/Link'
import * as Actions from 'support/actions/backend'

export default @inject(['router'])
class Index extends CrudPage {

  get resourceName () {
    return 'backend.content.videos'
  }

  get layout () {
    return IndexTable
  }

  get actions () {
    return (
      <div className="table-actions">
        <Link route={'backend.content.videos.edit'} label={'Rediger'}
              parameters={{ video: 'model:id' }}/>
        <Actions.Delete/>
      </div>
    )
  }

  get columns () {
    return (
      <React.Fragment>
        <Columns.Link name={'link'} />
        <Columns.Text name={'video_id'} />
        <Columns.Boolean name={'is_highlighted'}
                         label={'Highlighted'}
                         trueText={'Ja'} falseText={'Nej'}/>
        <Columns.DateTime name={'created_at'} label={'Oprettelsestidspunkt'}/>
      </React.Fragment>
    )
  }

  renderBeforeCrud () {
    return (
      <React.Fragment>
        <Link route={'backend.content.videos.create'}
              label={'Opret video'} className={'button button--yellow'}/>
      </React.Fragment>
    )
  }
}
