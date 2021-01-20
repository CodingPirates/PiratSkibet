import CrudPage from '@morningtrain/react-crud/CrudPage';
import {inject} from '@morningtrain/react-decorators';
import EditForm from '@morningtrain/react-crud/layouts/read/EditForm';
import * as Fields from 'support/fields';
import Link from 'widgets/navigation/Link';
import {Fieldset} from 'layouts';

export default
@inject(['router'])
class Edit extends CrudPage {

    get resourceName() {
        return 'backend.content.meeting';
    }

    get layout() {
        return EditForm;
    }

    get actions() {
        return (
            <div className="form-actions">
                <Link route={'backend.content.meetings.index'} label={'Tilbage til oversigten'} />
                <input type={'submit'} value={'gem'} />
            </div>
        );
    }

    get fields() {
        return (
            <React.Fragment>
                <Fieldset cols={2}>
                    <Fields.Input name={'description'} label={'Beskrivelse'} required={true} />
                    <Fields.Input name={'meeting_room'} label={'Møde rum navn'} required={true} />
                    <Fields.Time name={'from'} label={'Start tidspunkt'} required={true} />
                    <Fields.Time name={'to'} label={'Slut tidspunkt'} required={true} />
                    <Fields.Checkbox name={'banner_active'} label={'Aktiver banneret'} />
                    <Fields.Checkbox name={'meeting_active'} label={'Aktiver mødet'} />
                </Fieldset>
            </React.Fragment>
        );
    }

}
