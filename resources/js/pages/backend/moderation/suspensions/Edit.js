import React from "react";
import CrudPage from "@morningtrain/react-crud/CrudPage";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import ReadView from "@morningtrain/react-crud/layouts/read/ReadView";
import * as Fields from "support/fields";
import Link from "widgets/navigation/Link";
import {Fieldset} from "layouts";
import Section from "layouts/Section";
import * as Actions from "support/actions/backend";

export default
@inject(['router'])
class Edit extends CrudPage {

    get resourceName() {
        return 'backend.moderation.user_suspension';
    }

    get layout() {
        return ReadView;
    }

    get actions() {
        return (
            <div className="form-actions">
                <Fields.Case name={'active'} when={true}>
                    <Actions.Trigger label={'Slet'} operationName={'deactivate'} targetOperationName={'read'} />
                </Fields.Case>
                <Link route={'backend.moderation.index_suspensions'} label={'Tilbage til oversigten'} />
            </div>
        );
    }

    get fields() {
        return (
            <Section boxed={true}>
                <h3>Suspendering</h3>
                <Fieldset cols={2}>
                    <Fields.Display name={'start_at'} label={'Starttidspunkt'} />
                    <Fields.Display name={'end_at'} label={'Sluttidspunkt'} />
                    <Fields.Display name={'issuer.username'} label={'Issuer'} />
                </Fieldset>
                <h3>Bruger</h3>
                <Fieldset cols={2}>
                    <Fields.Display name={'user.name'} label={'Navn'} />
                    <Fields.Display name={'user.username'} label={'Brugernavn'} />
                    <Fields.Display name={'user.email'} label={'E-mail'} />
                    <Fields.Display name={'user.parent_email'} label={'Forældre e-mail'} />
                    <Fields.Display name={'user.birthday'} label='Fødselsdag' />
                </Fieldset>
            </Section>
        );
    }

}
