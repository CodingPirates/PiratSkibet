import React from "react";
import IndexTable from "@morningtrain/react-crud/layouts/index/IndexTable";
import * as Columns from "support/columns";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import Link from "widgets/navigation/Link";
import * as Filters from "support/filters";
import WhenModel from "support/conditionals/WhenModel";
import CrudComponent from "@morningtrain/react-crud/CrudComponent";

@inject(['router', 'model', 'caseChannel'])
export default class IndexRelated extends CrudComponent {

    static get defaultProps() {
        return {
            caseChannel: null,
            excludeActive: true,
            userKey: 'id',
        }
    }

    get resourceName() {
        return 'backend.moderation.moderation_case';
    }

    get layout() {
        return IndexTable;
    }

    get filters() {
        return [];
    }

    get constraints() {
        const {excludeActive, caseChannel, userKey} = this.props;

        return (
            <React.Fragment>
                <Filters.Static constraint={'status'} value={''} />
                {caseChannel ? <Filters.Echo channel={caseChannel} event={'updated'}/> : null}
                <Filters.ModelParameter constraint={'user'} modelKey={userKey}/>
                {excludeActive ? <Filters.ModelParameter constraint={'exclude'} modelKey={'id'}/> : null}
            </React.Fragment>
        );
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
                <Columns.Date name={'last_requested_at'} label={'Sidste henvendelse'} time={true} />
            </React.Fragment>
        );
    }

    render() {
        return (
            <WhenModel>
                {super.render()}
            </WhenModel>
        )
    }
}
