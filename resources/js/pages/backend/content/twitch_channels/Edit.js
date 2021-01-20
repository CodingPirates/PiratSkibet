import CrudPage from "@morningtrain/react-crud/CrudPage";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import EditForm from "@morningtrain/react-crud/layouts/read/EditForm";
import * as Fields from "support/fields";
import Link from "widgets/navigation/Link";
import {Fieldset} from "layouts";

export default
@inject(['router'])
class Edit extends CrudPage {

    get resourceName() {
        return 'backend.content.twitch_channel';
    }

    get layout() {
        return EditForm;
    }

    get actions() {
        return (
            <div className="form-actions">
                <Link route={'backend.content.twitch_channels.index'} label={'Tilbage til oversigten'} />
                <input type={'submit'} value={'gem'} />
            </div>
        );
    }

    get fields() {
        return (
            <React.Fragment>
                <Fieldset cols={2}>
                    <Fields.Input name={'channel_name'} label={'Kanal'} required={true} />
                    <Fields.Input name={'collection'} label={'Samling'} required={true} />
                </Fieldset>
            </React.Fragment>
        );
    }

}
