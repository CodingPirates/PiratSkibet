import React from "react";
import CrudPage from "@morningtrain/react-crud/CrudPage";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import EditForm from "@morningtrain/react-crud/layouts/read/EditForm";
import EditUserForm from "widgets/user/EditUserForm";
import * as Fields from "support/fields";
import Link from "widgets/navigation/Link";
import { Fieldset, Section } from "layouts";
import {Model, Trigger} from "@morningtrain/react-resources";
import RefreshOnSuccess from "@morningtrain/react-resources/src/RefreshOnSuccess";

export default
@inject(['router'])
class Edit extends CrudPage {

    get resourceName() {
        return 'backend.users.backend_user';
    }

    get layout() {
        return EditForm;
    }

    get actions() {
        return (
            <div className="form-actions">
                <Fields.Case name={'deleted_at'} exists={true}>
                    <Trigger operationName={'restore'} label={'Un-block'} className={'button button--pink'}>
                        <RefreshOnSuccess operationName={'read'} />
                    </Trigger>
                </Fields.Case>
                <Link route={'backend.users.backend.index'} label={'Tilbage til oversigten'} />
                <input type={'submit'} value={'gem'} />
            </div>
        );
    }

    get fields() {
        return (
            <React.Fragment>
                <Fieldset cols={2}>
                    <Fields.Input name={'name'} label={'Navn'} />
                    <Fields.Input name={'username'} label={'Brugernavn'} />
                    <Fields.Input name={'email'} label={'E-mail'} />
                    <Fields.Select name={'role_name'}
                                   enum={'user_roles'}
                                   only={['admin', 'mentor', 'moderator', 'pirate']}
                                   placeholder={'Vælg rolle'}
                                   label={'Rolle'} />
                </Fieldset>
            </React.Fragment>
        );
    }

}
