import React from 'react'
import CrudPage from '@morningtrain/react-crud/CrudPage'
import IndexTable from '@morningtrain/react-crud/layouts/index/IndexTable'
import * as Columns from 'support/columns'
import Link from 'widgets/navigation/Link'
import * as Actions from 'support/actions/backend'

export default class Index extends CrudPage {
  get resourceName () {
    return 'backend.gamification.user'
  }

  get layout () {
    return IndexTable
  }

  get actions () {
    return (
      <div className='table-actions'>
        <Link route='backend.gamification.users.view' label='Vis' parameters={{ user: 'model:id' }} />
      </div>
    )
  }

  get columns () {
    return (
      <>
        <Columns.Username name='username' label='Brugernavn' />
        <Columns.Text
          name='threads_count' label='Chats'
          alignment='center'
          headerTitle='Antal offentlige tråde oprettet af brugeren'
        />
        <Columns.Text
          name='messages_count' label='Beskeder'
          alignment='center'
          headerTitle='Antal offentlige beskeder skrevet af brugeren'
        />
        <Columns.Text
          name='message_likes' label='Besked Likes'
          alignment='center'
          headerTitle='Antal Likes på brugerens offentlige beskeder'
        />
        <Columns.Text
          name='message_endorsements'
          label='Besked Endorsements' alignment='center'
          headerTitle='Antal Endorsements på brugerens offentlige beskeder'
        />

        <Columns.Text
          name='projects_count' label='Projekter'
          alignment='center'
          headerTitle='Antal offentlige projekter oprette af brugeren'
        />
        <Columns.Text
          name='participating_projects_count'
          label='Projekter' alignment='center'
          headerTitle='Antal offentlige projekter brugeren deltager i'
        />
        <Columns.Text
          name='project_likes' label='Projekt Likes'
          alignment='center'
          headerTitle='Antal Likes på brugerens egne projekter'
        />
        <Columns.Text
          name='project_endorsements'
          label='Projekt Endorsements'
          alignment='center'
          headerTitle='Antal Endorsements på brugerens egne projekter'
        />
      </>
    )
  }
}
