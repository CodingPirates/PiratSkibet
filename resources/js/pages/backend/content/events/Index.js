import CrudPage from "@morningtrain/react-crud/CrudPage";
import IndexTable from "@morningtrain/react-crud/layouts/index/IndexTable";
import * as Columns from "support/columns";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import Link from "widgets/navigation/Link";
import * as Actions from "support/actions/backend";

export default
@inject(['router'])
class Index extends CrudPage {

    get resourceName() {
        return 'backend.content.event';
    }

    get layout() {
        return IndexTable;
    }

    get actions() {
        return (
            <div className="table-actions">
                <Link route={'backend.content.events.edit'} label={'Rediger'} parameters={{event:'model:id'}} />
                <Actions.Delete />
            </div>
        );
    }

    get columns() {
        return (
            <React.Fragment>
                <Columns.Text name={'title'} label={'Titel'}/>
                <Columns.Enum name={'status'} enum={'event_status'} label={'Status'}/>
                <Columns.Date name={'start_at'} label={'Start dato'} />
                <Columns.Date name={'end_at'} label={'Slut dato'} />
            </React.Fragment>
        );
    }

    renderBeforeCrud() {
        return (
            <React.Fragment>
                <Link route={'backend.content.events.create'} label={'Opret begivenhed'} className={'button button--yellow'} />
            </React.Fragment>
        );
    }
}
