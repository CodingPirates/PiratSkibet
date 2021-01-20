import React from "react";
import {Fieldset} from "layouts";
import Widget from "widgets/Widget";
import Section from "layouts/Section";
import * as Fields from "support/fields";
import {inject} from "@morningtrain/react-decorators";
import IndexRelated from "pages/backend/moderation/cases/IndexRelated";
import {Username} from "support/displays";
import {Text} from "@morningtrain/react-displays";
import IndexForUser from "pages/backend/moderation/suspensions/IndexForUser";
import FieldWrapper from "@morningtrain/react-fields/layouts/FieldWrapper";

@inject(['model'])
export default class User extends Widget {

    renderWidget() {
        return (
            <React.Fragment>

                <Section boxed={true} header={(<h3>Sagsmappe for <Text name={'user.username'} /></h3>)}>
                        <Fieldset cols={2} >
                            <Fields.Display name={'user.name'} label={'Navn'} />
                            <FieldWrapper label={'Brugernavn'}>
                                <Username name={'user.username'} />
                            </FieldWrapper>
                            <Fields.Display name={'user.email'} label={'E-mail'} />
                            <Fields.Display name={'user.parent_email'} label={'Forældre e-mail'} />
                            <Fields.Display name={'user.birthday'} label='Fødselsdag' type={'date'} />
                        </Fieldset>
                </Section>

                <Section header={(<h5>Andre sager med <Text name={'user.username'} /></h5>)}>
                    <IndexRelated userKey={'user_id'}/>
                </Section>

                <Section header={(<h5>Suspenderinger for <Text name={'user.username'} /></h5>)}>
                    <IndexForUser userKey={'user_id'}/>
                </Section>

            </React.Fragment>
        );
    }
}
