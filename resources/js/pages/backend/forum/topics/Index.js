import React from "react";
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
        return 'backend.forum.topic';
    }

    get layout() {
        return IndexTable;
    }

    get actions() {
        return (
            <div className="table-actions">
                <Link route={'backend.forum.edit_topic'} label={'Rediger'} parameters={{topic: 'model:id'}} />
                <Link route={'app.forum.topic'} label={'Vis'} newTab={true} parameters={{topic: 'model:id', topic_slug: 'model:slug'}} />
                <Actions.Delete />
            </div>
        );
    }

    get columns() {
        return (
            <React.Fragment>
                <Columns.Text name={'name'} label={'Navn'}/>
                <Columns.Text name={'parent_name'} label={'Overemne'} />
                <Columns.Text name={'slug'} label={'URL sti'} />
            </React.Fragment>
        );
    }

    renderBeforeCrud() {
        return (
            <React.Fragment>
                <Link route={'backend.forum.create_topic'} label={'Opret forum emmne'} className={'button button--yellow'} />
            </React.Fragment>
        );
    }
}
