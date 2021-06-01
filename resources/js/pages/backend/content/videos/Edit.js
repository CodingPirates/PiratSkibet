import React from 'react'
import CrudPage from '@morningtrain/react-crud/CrudPage'
import { inject } from '@morningtrain/react-decorators'
import EditForm from '@morningtrain/react-crud/layouts/read/EditForm'
import * as Fields from 'support/fields'
import * as Displays from 'support/displays'
import Link from 'widgets/navigation/Link'
import { Fieldset } from 'layouts'

export default
@inject(['router'])
class Edit extends CrudPage {
  get resourceName () {
    return 'backend.content.videos'
  }

  get layout () {
    return EditForm
  }

  get actions () {
    return (
      <div className='form-actions'>
        <Link
          route='backend.content.videos.index'
          label='Tilbage til oversigten'
        />
        <input type='submit' value='gem' />
      </div>
    )
  }

  get fields () {
    return (
      <>
        <Fieldset cols={2}>
          <Fields.Input name='title' label='Titel' required />
          <Fields.Input name='video_id' label='Video ID' required />
          <Fields.TextArea name='description' label='Beskrivelse' required />
          <Fields.Checkbox
            name='is_highlighted' label='Er videoen Highlighted?'
            required
          />
          <Fields.Case name='embed_id' exists>
            <div style={{ width: '50%' }}>
              <Displays.YoutubeVideo name='embed_id' />
            </div>
          </Fields.Case>

          <Fields.HasMany resourceName={'backend.projects.category'} name={'categories'} label={'Kategorier'} optionsKey={'name'} >
            <Fields.Hidden name={'id'} prefixName={false} />
          </Fields.HasMany>
        </Fieldset>
        <br />
      </>
    )
  }
}
