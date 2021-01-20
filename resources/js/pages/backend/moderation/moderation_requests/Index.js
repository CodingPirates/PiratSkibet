import React from "react";
import IndexTable from "@morningtrain/react-crud/layouts/index/IndexTable";
import * as Columns from "support/columns";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import * as Filters from "support/filters";
import CrudComponent from "@morningtrain/react-crud/CrudComponent";

export default
@inject(['router', 'model', 'caseChannel'])
class Index extends CrudComponent {

    get resourceName() {
        return 'backend.moderation.moderation_request';
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
                <Columns.Username name={'reporter.username'} label={'Rapporteret af'} sort_slug={'orderByUsername'}/>
                <Columns.Enum name={'reason'} enum={'moderation_reasons'} label={'Årsag'}/>
                <Columns.Text name={'comment'} label={'Begrundelse'}/>
                <Columns.Date name={'created_at'} label={'Tidspunkt'} dateFormat={'DD.MM.YYYY hh:mm'}/>
            </React.Fragment>
        );
    }
}
