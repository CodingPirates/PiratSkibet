import CrudPage from "@morningtrain/react-crud/CrudPage";
import IndexTable from "@morningtrain/react-crud/layouts/index/IndexTable";
import * as Columns from "support/columns";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import Link from "widgets/navigation/Link";
import * as Filters from "support/filters";

export default @inject(['router'])
class Index extends CrudPage {

    get resourceName() {
        return 'backend.moderation.moderation_case';
    }

    get layout() {
        return IndexTable;
    }

    get actions() {
        return (
            <div className="table-actions">
                <Link route={'backend.moderation.view_case'} label={'Detaljer'} parameters={{moderation_case:'model:id'}}/>
            </div>
        );
    }

    get columns() {
        return (
            <React.Fragment>
                <Columns.Enum name={'moderateable_type'} label={'Type'} enum={'models'} />
                <Columns.Enum name={'status'} label={'Status'} enum={'moderation_case_status'} />
                <Columns.Text name={'requests_count'} label={'Antal klager'} />
                <Columns.Username name={'user.username'} label={'Ansvarlig bruger'} sort_slug={'orderByUsername'} />
                <Columns.Date name={'last_requested_at'} label={'Sidste henvendelse'} time={true} />
            </React.Fragment>
        );
    }
}
