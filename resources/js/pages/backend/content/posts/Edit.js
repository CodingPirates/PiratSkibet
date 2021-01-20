import CrudPage from "@morningtrain/react-crud/CrudPage";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import EditForm from "@morningtrain/react-crud/layouts/read/EditForm";
import * as Fields from "support/fields";
import Link from "widgets/navigation/Link";
import {Fieldset} from "layouts";

@inject(['router'])
export default class Edit extends CrudPage {

    get resourceName() {
        return 'backend.content.posts';
    }

    get layout() {
        return EditForm;
    }

    get actions() {
        return (
            <div className="form-actions">
                <Link route={'backend.content.posts.index'} label={'Tilbage til oversigten'} />
                <input type={'submit'} value={'gem'} />
            </div>
        );
    }

    get fields() {
        return (
            <React.Fragment>
                <Fieldset cols={2}>
                    <Fields.Input name={'title'} label={'Titel'} required={true} />
                    <Fields.Input name={'path'} label={'Sti'} required={true} />
                    <Fields.Input name={'description'} label={'Beskrivelse'}/>
                    <Fields.Input name={'image'} label={'Billedsti'}/>
                    <Fields.Select name={'status'} enum={'generic_status'} label={'Status'} required={true} placeholder={'Vælg status'} defaultValue={'draft'} />
                </Fieldset>
                <Fields.Editor name={'content'} label={'Beskrivelse'} required={true} />
            </React.Fragment>
        );
    }

}
