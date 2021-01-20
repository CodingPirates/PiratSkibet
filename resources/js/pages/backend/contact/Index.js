import CrudPage from "@morningtrain/react-crud/CrudPage";
import IndexTable from "@morningtrain/react-crud/layouts/index/IndexTable";
import * as Columns from "support/columns";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import Link from "widgets/navigation/Link";

export default
@inject(['router'])
class Index extends CrudPage {

    get resourceName() {
        return 'backend.users.contact';
    }

    get layout() {
        return IndexTable;
    }

    get actions() {
        return (
            <div className="table-actions">
                <Link route={'backend.contact.edit'} label={'Vis'} parameters={{contact_submission:'model:id'}} />
            </div>
        );
    }

    get columns() {
        return (
            <React.Fragment>
                <Columns.Enum name={'type'} label={'Type'} enum={'contact_submission_type'}/>
                <Columns.Text name={'subject'} label={'Emne'}/>
                <Columns.Text name={'name'} label={'Navn'}/>
                <Columns.Text name={'email'} label={'Email'}/>
                <Columns.Text name={'phone'} label={'Telefon'}/>
                <Columns.Date name={'created_at'} label={'Indsendt'} time={true} />
                <Columns.Text name={'score'} label={'Spam score'} />
            </React.Fragment>
        );
    }
}
