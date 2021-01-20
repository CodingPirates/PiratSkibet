import CrudPage from '@morningtrain/react-crud/CrudPage';
import IndexTable from '@morningtrain/react-crud/layouts/index/IndexTable';
import * as Columns from 'support/columns';
import {inject} from '@morningtrain/react-decorators';
import Link from 'widgets/navigation/Link';
import * as Actions from 'support/actions/backend';

export default
@inject(['router'])
class Index extends CrudPage {

    get resourceName() {
        return 'backend.content.meeting';
    }

    get layout() {
        return IndexTable;
    }

    get actions() {
        return (
            <div className="table-actions">
                <Link route={'backend.content.meetings.edit'} label={'Rediger'} parameters={{meeting:'model:id'}} />
                <Actions.Delete />
            </div>
        );
    }

    get columns() {
        return (
            <React.Fragment>
                <Columns.Text name={'meeting_room'} label={'Møde rum'}/>
                <Columns.Text name={'description'} label={'Beskrivelse'}/>
                <Columns.Boolean name={'banner_active'} label={'Synligt'} trueText={'Ja'} falseText={'Nej'}/>
                <Columns.Boolean name={'meeting_active'} label={'Aktiv'} trueText={'Ja'} falseText={'Nej'}/>
                <Columns.Time name={'from'} label={'Start'} parseFormat={'HH:mm:ss'}/>
                <Columns.Time name={'to'} label={'Slut'} parseFormat={'HH:mm:ss'}/>
            </React.Fragment>
        );
    }

    renderBeforeCrud() {
        return (
            <React.Fragment>
                <Link route={'backend.content.meetings.create'} label={'Opret møde'} className={'button button--yellow'} />
            </React.Fragment>
        );
    }
}
