import React from "react";
import IndexTable from "@morningtrain/react-crud/layouts/index/IndexTable";
import * as Columns from "support/columns";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import * as Filters from "support/filters";
import CrudComponent from "@morningtrain/react-crud/CrudComponent";

@inject(['router', 'model', 'caseChannel'])
export default class Index extends CrudComponent {

    get resourceName() {
        return 'backend.moderation.moderation_action';
    }

    get layout() {
        return IndexTable;
    }

    get filters() {
        return [];
    }

    get constraints() {
        return (
            <React.Fragment>
                <Filters.Echo channel={this.props.caseChannel} event={'updated'}/>
                <Filters.RouteParameter constraint={'moderation_case'}/>
            </React.Fragment>
        );
    }

    get columns() {
        return (
            <React.Fragment>
                <Columns.Date name={'created_at'} label={'Tidspunkt'} dateFormat={'DD.MM.YYYY hh:mm'}/>
                <Columns.Text name={'label'} label={'Handling'} />
                <Columns.Username name={'user.username'} label={'Udført af'} defaultValue={'System'} />
                <Columns.Text name={'note'} label={'Begrundelse'} defaultValue={'-'} />
            </React.Fragment>
        );
    }
}
