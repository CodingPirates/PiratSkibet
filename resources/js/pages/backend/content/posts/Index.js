import CrudPage from "@morningtrain/react-crud/CrudPage";
import IndexTable from "@morningtrain/react-crud/layouts/index/IndexTable";
import * as Columns from "support/columns";
import * as Fields from "support/fields";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import Link from "widgets/navigation/Link";
import * as Actions from "support/actions/backend";

@inject(['router'])
export default class Index extends CrudPage {

    get resourceName() {
        return 'backend.content.posts';
    }

    get layout() {
        return IndexTable;
    }

    get actions() {
        return (
            <div className="table-actions">
                <Link route={'backend.content.posts.edit'} label={'Rediger'} parameters={{post:'model:id'}} />
                <Fields.Case name={'type'} when={'revision'} not={true}  >
                    <Link route={'app.pages.posts'} label={'Vis'} parameters={{path:'model:path'}} newTab={true} />
                </Fields.Case>
                <Actions.Delete />
            </div>
        );
    }

    get columns() {
        return (
            <React.Fragment>
                <Columns.Text name={'title'} label={'Titel'} sortable={true} />
                <Columns.Enum name={'status'} enum={'generic_status'} sortable={true} />
                <Columns.Enum name={'type'} enum={'post_type'} sortable={true} />
                <Columns.Date name={'updated_at'} label={'Sidst opdateret'} sortable={true} time={true} />
            </React.Fragment>
        );
    }

    renderBeforeCrud() {
        return (
            <React.Fragment>
                <Link route={'backend.content.posts.create'} label={'Opret side'} className={'button button--yellow'} />
            </React.Fragment>
        );
    }
}
