import React from 'react'
import * as Fields from 'support/fields'
import * as Displays from 'support/displays'

export default class Questionnaire extends React.Component {
  render () {
    return (
      <Fields.Case when='questionnaire'>

        <Fields.Input name='meta.title' label='Titel' />
        <Fields.Editor name='meta.text' label='Tekst' />

        <Fields.Repeater
          name='meta.questions'
          addLabel='Tilføj spørgsmål'
          label='Spørgsmål'
          modelKey='uuid'
          itemHeader={(
            <>
              <Displays.Text name='question' />
            </>
                                 )}
        >

          <Fields.Uuid />
          <Fields.Hidden name='type' defaultValue='multiple_choice' />
          <Fields.Input name='question' label='Spørgsmål' />
          <Fields.Editor name='description' label='Uddybende tekst' />
          <Fields.Repeater
            name='answers'
            addLabel='Tilføj svar'
            label='Svar muligheder'
            modelKey='uuid'
            itemHeader={(
              <>
                <Displays.Text name='answer' />
              </>
                                     )}
          >
            <Fields.Uuid />
            <Fields.Input name='answer' label='Svar mulighed' />
            <Fields.Checkbox name='is_correct' label='Er korrekt svar' defaultValue={false} />
          </Fields.Repeater>

        </Fields.Repeater>

      </Fields.Case>
    )
  }
}
