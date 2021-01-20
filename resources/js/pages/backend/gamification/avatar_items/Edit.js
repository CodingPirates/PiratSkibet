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
        return 'backend.gamification.avatar_item';
    }

    get layout() {
        return EditForm;
    }

    get actions() {
        return (
            <div className="form-actions">
                <Link route={'backend.gamification.avatar_items.index'} label={'Tilbage til oversigten'} />
                <input type={'submit'} value={'gem'} />
            </div>
        );
    }

    get fields() {
        return (
            <React.Fragment>
                <Fieldset cols={2}>
                    <Fields.Input name={'name'} label={'Titel'} required={true} />
                    <Fields.Select name={'category'} enum={'selectable_avatar_category'} label={'Kategori'} required={true} placeholder={'Vælg kategori'} />
                    <Fields.Select name={'status'} enum={'generic_status'} label={'Status'} required={true} placeholder={'Vælg status'} />
                    <Fields.Checkbox name={'is_public'} label={'Er frit tilgængelig?'} defaultValue={true} />
                    <Fields.Checkbox name={'is_default'} label={'Kan benyttes i standard avatar?'} defaultValue={true} />
                    <Fields.Checkbox name={'is_featured'} label={'Skal vises i toppen?'} defaultValue={false} />
                </Fieldset>

                <Fieldset>
                    <Fields.AvatarItem name={'content'} label={'SVG Indhold'} />
                </Fieldset>


            </React.Fragment>
        );
    }

}
