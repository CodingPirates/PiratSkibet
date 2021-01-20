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
        return 'backend.content.news';
    }

    get layout() {
        return EditForm;
    }

    get actions() {
        return (
            <div className="form-actions">
                <Link route={'backend.content.news.index'} label={'Tilbage til oversigten'} />
                <input type={'submit'} value={'gem'} />
            </div>
        );
    }

    get fields() {
        return (
            <React.Fragment>
                <Fieldset cols={2}>
                    <Fields.Input name={'title'} label={'Titel'} required={true} />
                    <Fields.Input name={'img'} label={'Billede sti'} required={true} />
                    <Fields.Input name={'link'} label={'Link'} required={true} />
                    <Fields.Date name={'publish_at'} label={'Udgivelses dato'} time={true} required={true} />
                </Fieldset>

                    <Fields.Editor name={'subtext'} label={'Beskrivelse'} required={true} />

                <Fieldset cols={2}>
                    {/* Enums */}
                    <Fields.Select name={'theme'} enum={'theme'} label={'Tema'} required={true} placeholder={'Vælg tema'} />
                    <Fields.Select name={'status'} enum={'generic_status'} label={'Status'} required={true} placeholder={'Vælg status'} />

                    <Fields.Checkbox name={'featured'} label={'Fremhævet'} />
                </Fieldset>
            </React.Fragment>
        );
    }

}
