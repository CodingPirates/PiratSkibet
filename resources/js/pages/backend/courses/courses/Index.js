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
        return 'backend.courses.course';
    }

    get layout() {
        return IndexTable;
    }

    get actions() {
        return (
            <div className="table-actions">
                <Link route={'backend.courses.edit_course'} label={'Rediger'} parameters={{course:'model:id'}} />
                <Actions.Delete />
            </div>
        );
    }

    get columns() {
        return (
            <React.Fragment>
                <Columns.Text name={'title'} label={'Titel'}/>
                <Columns.Text name={'slug'} />
                <Columns.Text name={'category_title'} label={'Kategori'} />
                <Columns.Text name={'position'} label={'Position'} />
                <Columns.Enum name={'level'} label={'Sværhedsgrad'} enum={'difficulty_levels'}/>
            </React.Fragment>
        );
    }

    renderBeforeCrud() {
        return (
            <React.Fragment>
                <Link route={'backend.courses.create_course'} label={'Opret læringsforløb'} className={'button button--yellow'} />
            </React.Fragment>
        );
    }
}
