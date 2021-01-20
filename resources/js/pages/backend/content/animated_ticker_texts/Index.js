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
        return 'backend.content.animated_ticker_text';
    }

    get layout() {
        return IndexTable;
    }

    get actions() {
        return (
            <div className="table-actions">
                <Link route={'backend.content.animated_ticker_texts.edit'} label={'Rediger'} parameters={{animated_ticker_text:'model:id'}} />
                <Actions.Delete />
            </div>
        );
    }

    get columns() {
        return (
            <React.Fragment>
                <Columns.Text name={'text'} label={'Tekst'}/>
            </React.Fragment>
        );
    }

    renderBeforeCrud() {
        return (
            <React.Fragment>
                <Link route={'backend.content.animated_ticker_texts.create'} label={'Opret ticker tekst'} className={'button button--yellow'} />
            </React.Fragment>
        );
    }
}
