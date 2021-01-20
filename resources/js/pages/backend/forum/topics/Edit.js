import CrudPage from "@morningtrain/react-crud/CrudPage";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import EditForm from "@morningtrain/react-crud/layouts/read/EditForm";
import * as Fields from "support/fields";
import Link from "widgets/navigation/Link";
import { Fieldset } from "layouts";
import * as Displays from "support/displays";

export default
@inject(['router'])
class Edit extends CrudPage {

    get resourceName() {
        return 'backend.forum.topic';
    }

    get layout() {
        return EditForm;
    }

    get actions() {
        return (
            <div className="form-actions">
                <Link route={'backend.forum.index_topics'} label={'Tilbage til oversigten'} />
                <input type={'submit'} value={'gem'} />
            </div>
        );
    }

    generateSlug(value) {
        const slug = value
            .toLowerCase()
            .replace(/[-.\s]/g, '_')
            .replace(/[^a-zæøåA-ZÆØÅ0-9_]/g, '');
    }

    get baseFields() {
        return (
            <React.Fragment>
                <Fieldset cols={2}>
                    <Fields.Input name={'name'} label={'Navn'} required={true} onChange={this.generateSlug.bind(this)}/>
                    <Fields.Input name={'slug'} label={'URL sti'} />
                    <Fields.TextArea name={'description'} label={'Beskrivelse'} />
                </Fieldset>
            </React.Fragment>
        );

    }

    get fields() {
        return (
            <React.Fragment>
                {this.baseFields}
                <Fields.Repeater name={'children'}
                                 label={'Underemner'}
                                 itemHeader={(
                                     <Displays.Text name={'name'} />
                                 )}
                                 addLabel={'Tilføj underemne'}>
                    <Fields.Hidden name={'id'} />
                    {this.baseFields}
                </Fields.Repeater>
            </React.Fragment>
        );
    }

}
