import CrudPage from "@morningtrain/react-crud/CrudPage";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import EditForm from "@morningtrain/react-crud/layouts/read/EditForm";
import * as Fields from "support/fields";
import Link from "widgets/navigation/Link";
import { Fieldset } from "layouts";
import React from 'react'
import Text from '../course_resources/Text'
import Video from '../course_resources/Video'
import Questionnaire from '../course_resources/Questionnaire'

export default
@inject(['router'])
class Edit extends CrudPage {

    get resourceName() {
        return 'backend.courses.category';
    }

    get layout() {
        return EditForm;
    }

    get actions() {
        return (
            <div className="form-actions">
                <Link route={'backend.courses.index_categories'} label={'Tilbage til oversigten'} />
                <input type={'submit'} value={'gem'} />
            </div>
        );
    }

    get fields() {
        return (
            <React.Fragment>
                <Fieldset cols={2}>
                    <Fields.Input name={'title'} label={'Titel'} required={true} />
                    <Fields.Input name={'slug'} label={'Sti'} />
                    <Fields.Checkbox name={'active'} label={'Aktiv'} />
                </Fieldset>

                <Fieldset cols={1}>
                    <Fields.Editor name={'description'} label={'Beskrivelse'} />
                </Fieldset>

                <Fieldset cols={2}>
                    <Fields.Input name={'color'} type={'color'} label={'Farve på skiltet'} />
                </Fieldset>

                <Fieldset cols={2}>
                    <Fields.Files name={'logo'} label={'Logo på skiltet'} maxFiles={1}/>
                    <Fields.Files name={'thumbnail'} label={'Billede'} maxFiles={1}/>
                </Fieldset>

                <Fields.Repeater name={'resource_links'}
                                 addLabel={'Tilføj link'}
                                 label={'Resource links'}>
                    <Fields.Hidden name={'id'}/>
                    <Fields.Input name={'text'}/>
                    <Fields.Input name={'url'}/>
                </Fields.Repeater>

            </React.Fragment>
        );

    }

}
