import CrudPage from "@morningtrain/react-crud/CrudPage";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import EditForm from "@morningtrain/react-crud/layouts/read/EditForm";
import * as Fields from "support/fields";
import * as Displays from "support/displays";
import Link from "widgets/navigation/Link";
import { Fieldset } from "layouts";

export default
@inject(['router'])
class Edit extends CrudPage {

    get resourceName() {
        return 'backend.projects.category';
    }

    get layout() {
        return EditForm;
    }

    get actions() {
        return (
            <div className="form-actions">
                <Link route={'backend.projects.index_categories'} label={'Tilbage til oversigten'} />
                <input type={'submit'} value={'gem'} />
            </div>
        );
    }

    get baseFields() {
        return (
            <React.Fragment>
                <Fieldset cols={3}>
                    <Fields.Input name={'name'} label={'Navn'} required={true} />
                    <Fields.Input name={'slug'} label={'Sti'} />
                    <Fields.Select name={'status'} enum={'visible_status'} label={'Status'} required={true} placeholder={'Vælg status'} />
                </Fieldset>
            </React.Fragment>
        );

    }

    get fields() {
        return (
            <React.Fragment>
                {this.baseFields}
                <Fields.Repeater name={'children'}
                                 addLabel={'Tilføj underkategori'}
                                 itemHeader={(<Displays.Text name={'name'} />)}
                                 label={'Underkategorier'} >
                    <Fields.Hidden name={'id'} />
                    {this.baseFields}
                </Fields.Repeater>
            </React.Fragment>
        );
    }

}
