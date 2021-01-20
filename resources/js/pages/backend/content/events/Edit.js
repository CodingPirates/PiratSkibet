import CrudPage from "@morningtrain/react-crud/CrudPage";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import EditForm from "@morningtrain/react-crud/layouts/read/EditForm";
import * as Fields from "support/fields";
import Link from "widgets/navigation/Link";
import { Fieldset } from "layouts";
import React from "react";

export default
@inject(['router'])
class Edit extends CrudPage {

    get resourceName() {
        return 'backend.content.event';
    }

    get layout() {
        return EditForm;
    }

    get actions() {
        return (
            <div className="form-actions">
                <Link route={'backend.content.events.index'} label={'Tilbage til oversigten'} />
                <input type={'submit'} value={'gem'} />
            </div>
        );
    }

    get fields() {
        return (
            <React.Fragment>
                <Fieldset cols={2}>
                    <Fields.Input name={'title'} label={'Titel'} required={true} />
                    <Fields.Select name={'status'} enum={'event_status'} label={'Status'} required={true} placeholder={'Vælg status'} defaultValue={'draft'} />
                    <Fieldset>
                        <Fields.Editor name={'description'} label={'Beskrivelse'} required={true} />
                    </Fieldset>
                    <Fieldset>
                        <Fields.Input name={'img'} label={'Billede sti'} required={true} />
                        <Fields.Input name={'link'} label={'Link til begivenhed'} required={true} />
                    </Fieldset>
                </Fieldset>

                <Fieldset cols={2}>
                    <Fields.Date name={'start_at'} label={'Start dato'} time={true} required={true} />
                    <Fields.Date name={'end_at'} label={'Slut dato'} time={true} required={true} />
                    <Fields.Date name={'publish_at'} label={'Udgivelses dato'} time={true} required={true} />
                </Fieldset>

                <Fields.Repeater name={'reminders'} label={'Påmindelser'} addLabel={'Tilføj påmindelse'}>
                    <Fields.Hidden name={'id'} />
                    <Fields.Date name={'remind_at'} label={'Dato for påmindelse'} time={true} required={true} />
                </Fields.Repeater>

                <Fields.HasMany resourceName={'backend.regions.region'} name={'regions'} label={'Regioner'} optionsKey={'name'} >
                    <Fields.Hidden name={'id'} prefixName={false} />
                </Fields.HasMany>

            </React.Fragment>
        );
    }

}
