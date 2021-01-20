import React from 'react';
import CrudPage from "@morningtrain/react-crud/CrudPage";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import ReadView from "@morningtrain/react-crud/layouts/read/ReadView";
import * as Fields from "support/fields";
import Link from "widgets/navigation/Link";
import {Fieldset} from "layouts";
import Section from "layouts/Section";
import {Username, Text} from "support/displays";
import FlexSplitter from "layouts/FlexSplitter";
import Preview from "pages/backend/moderation/moderateable/Preview";
import IndexForUser from "pages/backend/gamification/achievements/IndexForUser";
import FieldWrapper from "@morningtrain/react-fields/layouts/FieldWrapper";

export default
@inject(['router'])
class View extends CrudPage {

    get resourceName() {
        return 'backend.gamification.user';
    }

    get layout() {
        return ReadView;
    }

    get fields() {
        return (
            <React.Fragment>
                <FlexSplitter>
                    <Link route={'backend.gamification.users.index'} label={'Tilbage til oversigten'} />
                    <Preview label={'Grant Achievement'}>
                        <div className={'table-modal-wrap flex-mobile'}>
                            <h5>Achievements</h5>
                            <IndexForUser granted={false}/>
                        </div>
                    </Preview>
                </FlexSplitter>

                <Section boxed={true} header={(<h3>Bruger <Text name={'username'} /></h3>)}>
                    <Fieldset cols={2} >
                        <Fields.Display name={'name'} label={'Navn'} />
                        <FieldWrapper label={'Brugernavn'}>
                            <Username name={'username'} />
                        </FieldWrapper>
                        <Fields.Display name={'email'} label={'E-mail'} />
                        <Fields.Display name={'parent_email'} label={'Forældre e-mail'} />
                        <Fields.Display name={'birthday'} label='Fødselsdag' />
                    </Fieldset>
                </Section>

                <Section boxed={true} header={(<h3>Tildelte Achievements</h3>)}>
                    <IndexForUser granted={true}/>
                </Section>
            </React.Fragment>
        );
    }

}
