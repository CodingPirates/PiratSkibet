import React from 'react'
import CrudPage from '@morningtrain/react-crud/CrudPage'
import { inject } from '@morningtrain/react-decorators'
import EditForm from '@morningtrain/react-crud/layouts/read/EditForm'
import * as Fields from 'support/fields'
import * as Displays from 'support/displays'
import Link from 'widgets/navigation/Link'
import { Fieldset } from 'layouts'

export default @inject(['router'])
class Edit extends CrudPage {

  get resourceName () {
    return 'backend.content.livestreams'
  }

  get layout () {
    return EditForm
  }

  get actions () {
    return (
      <div className="form-actions">
        <Link route={'backend.content.livestreams.index'}
              label={'Tilbage til oversigten'}/>
        <input type={'submit'} value={'gem'}/>
      </div>
    )
  }

  get fields () {
    return (
      <React.Fragment>
        <Fieldset cols={2}>
          <Fields.Input name={'livestream_id'} required={true}/>
          <Fields.Select name={'type'} enum={'livestream_types'} label={'Type'}
                         required={true} placeholder={'Vælg type'}
                         defaultValue={'youtube'}/>
          <Fields.Checkbox name={'is_live'} label={'Er live?'} required={true}/>
          <Fields.Case name={'embed_id'} exists={true}>
            <div style={{ width: '50%' }}>
              <Fields.Case name={'type'} when={'youtube_channel'}>
                <Displays.YoutubeVideo name={'embed_id'} isChannel={true}/>
              </Fields.Case>

              <Fields.Case name={'type'} when={'youtube_channel'} not={true}>
                <Displays.YoutubeVideo name={'embed_id'}/>
              </Fields.Case>
            </div>
          </Fields.Case>
        </Fieldset>
        <br/>
      </React.Fragment>
    )
  }

}
