import React from "react";
import IndexTable from "@morningtrain/react-crud/layouts/index/IndexTable";
import {inject} from "@morningtrain/react-decorators";
import * as Columns from "support/columns";
import * as Filters from "support/filters";
import Link from "widgets/navigation/Link";
import CrudComponent from "@morningtrain/react-crud/CrudComponent";
import WhenModel from "support/conditionals/WhenModel";

@inject(['router', 'model', 'caseChannel'])
export default class IndexForUser extends CrudComponent {

    static get defaultProps() {
        return {
            caseChannel: null,
            userKey: 'id',
        }
    }

    get resourceName() {
        return 'backend.moderation.user_suspension';
    }

    get layout() {
        return IndexTable;
    }

    get filters() {
        return [];
    }

    get constraints() {
        const {caseChannel, userKey} = this.props;

        return (
            <React.Fragment>
                {caseChannel ? <Filters.Echo channel={caseChannel} event={'updated'}/> : null}
                <Filters.ModelParameter constraint={'user'} modelKey={userKey}/>
            </React.Fragment>
        );
    }

    get actions() {
        return (
            <div className="table-actions">
                <Link route={'backend.moderation.edit_suspension'} label={'Detaljer'} parameters={{user_suspension:'model:id'}} />
            </div>
        );
    }

    get columns() {
        return (
            <React.Fragment>
                <Columns.Duration name={'duration'} label={'Længde'} unit={'seconds'} sort_slug={'orderByDuration'} />
                <Columns.Date name={'start_at'} label={'Fra'} dateFormat={'DD.MM.YYYY hh:mm'}/>
                <Columns.Date name={'end_at'} label={'Til'} dateFormat={'DD.MM.YYYY hh:mm'}/>
                <Columns.Username name={'issuer.username'} label={'Issuer'} defaultValue={'automatisk'} />
            </React.Fragment>
        );
    }

    render() {
        /// We are using the ModelParameter filter
        /// To prevent displaying the index without use constraint
        /// Then we will wait for the model to be ready
        return (
            <WhenModel>
                {super.render()}
            </WhenModel>
        )
    }

}
