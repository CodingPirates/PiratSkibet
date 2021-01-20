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
        return 'backend.content.news';
    }

    get layout() {
        return IndexTable;
    }

    get actions() {
        return (
            <div className="table-actions">
                <Link route={'backend.content.news.edit'} label={'Rediger'} parameters={{news:'model:id'}} />
                <Actions.Delete />
            </div>
        );
    }

    get columns() {
        return (
            <React.Fragment>
                <Columns.Enum name={'status'} label={'Status'} enum={'generic_status'} />
                <Columns.Text name={'title'} label={'Titel'}/>
                <Columns.Boolean name={'featured'} label={'Fremhævet'} trueText={'Ja'} falseText={'Nej'}/>
                <Columns.Date name={'publish_at'} label={'Udgivelses dato'} time={true} />
            </React.Fragment>
        );
    }

    renderBeforeCrud() {
        return (
            <React.Fragment>
                <Link route={'backend.content.news.create'} label={'Opret nyhed'} className={'button button--yellow'} />
            </React.Fragment>
        );
    }
}
