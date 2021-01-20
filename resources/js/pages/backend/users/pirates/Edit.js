import React from 'react';
import CrudPage from '@morningtrain/react-crud/CrudPage';
import {inject} from '@morningtrain/react-decorators';
import EditForm from '@morningtrain/react-crud/layouts/read/EditForm';
import EditUserForm from 'widgets/user/EditUserForm';
import * as Fields from 'support/fields';
import Link from 'widgets/navigation/Link';
import {Fieldset, Section} from 'layouts';
import {Model, Trigger} from '@morningtrain/react-resources';
import {Text} from '@morningtrain/react-displays';
import IndexRelated from 'pages/backend/moderation/cases/IndexRelated';
import IndexForUser from 'pages/backend/moderation/suspensions/IndexForUser';
import RefreshOnSuccess from '@morningtrain/react-resources/src/RefreshOnSuccess';

export default
@inject(['router'])
class Edit extends CrudPage {

    get resourceName() {
        return 'backend.users.user';
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
                <Link route={'backend.users.pirates.index'} label={'Tilbage til oversigten'} />
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
                    <Fields.Input name={'parent_email'} label={'Forældre e-mail'} />
                    <Fields.Date name='birthday' label='Fødselsdag' required={true} {...EditUserForm.birthdayOptions} />
                    <Fields.Input name='zipcode' label='Postnummer' required={true} />{/* TODO - make zipcode field */}

                    <Fields.Cases.In name={'role_name'} in={['pirate', 'mentor']}>
                        <Fields.Select name={'role_name'}
                                       enum={'user_roles'}
                                       only={['pirate', 'mentor']}
                                       placeholder={'Vælg rolle'}
                                       label={'Rolle'}/>
                    </Fields.Cases.In>

                    <Fields.Cases.In name={'role_name'} in={['pirate', 'mentor']} negate={true}>
                            <Fields.Select name={'role_name'}
                                           enum={'user_roles'}
                                           disabled={true}
                                           label={'Rolle'}/>
                    </Fields.Cases.In>

                    <Fields.Blank/>
                </Fieldset>
            </React.Fragment>
        );
    }

    renderAfterCrud() {
        return (
            <Model resourceName={this.resourceName}>
                <Section header={(<h3>
                    <span>Moderationssager for </span>
                    <span><Text name={'username'} /></span>
                </h3>)}>
                    <IndexRelated excludeActive={false}/>
                </Section>

                <Section header={(<h3><span>Suspenderingshistorik</span></h3>)}>
                    <IndexForUser/>
                </Section>
            </Model>
        );
    }

}
