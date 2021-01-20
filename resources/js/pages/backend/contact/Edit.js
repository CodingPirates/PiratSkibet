import React from "react";
import CrudPage from "@morningtrain/react-crud/CrudPage";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import EditForm from "@morningtrain/react-crud/layouts/read/EditForm";
import EditUserForm from "widgets/user/EditUserForm";
import * as Fields from "support/fields";
import Link from "widgets/navigation/Link";
import { Fieldset } from "layouts";
import {Trigger} from "@morningtrain/react-resources";

export default
@inject(['router'])
class Edit extends CrudPage {

    get resourceName() {
        return 'backend.users.contact';
    }

    get layout() {
        return EditForm;
    }

    get actions() {
        return (
            <div className="form-actions">
                <Link route={'backend.contact.index'} label={'Tilbage til oversigten'} />
            </div>
        );
    }

    get fields() {
        return (
            <React.Fragment>
                <Fieldset cols={2}>
                    <Fields.Display name={'type'} label={'Type'} enum={'contact_submission_type'}/>
                    <Fields.Blank/>
                    <Fields.Display name={'subject'} label={'Emmne'}/>
                    <Fields.Display name={'created_at'} label={'Indsendt'}/>
                </Fieldset>

                <Fields.Display name={'message'} label={'Besked'}/>

                <Fieldset cols={2}>
                    <Fields.Display name={'name'} label={'Navn'}/>
                    <Fields.Display name={'email'} label={'Email'}/>
                    <Fields.Display name={'phone'} label={'Telefon'}/>
                </Fieldset>
            </React.Fragment>
        );
    }

}
