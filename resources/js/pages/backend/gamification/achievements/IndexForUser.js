import React from "react";
import IndexTable from "@morningtrain/react-crud/layouts/index/IndexTable";
import {inject} from "@morningtrain/react-decorators";
import * as Columns from "support/columns";
import * as Filters from "support/filters";
import * as Actions from "support/actions/backend";
import CrudComponent from "@morningtrain/react-crud/CrudComponent";
import WhenModel from "support/conditionals/WhenModel";

@inject(['router', 'model'])
export default class IndexForUser extends CrudComponent {

    static get defaultProps() {
        return {
            userKey: 'id',
            granted: false,
        }
    }

    get resourceName() {
        return 'backend.gamification.achievement';
    }

    get layout() {
        return IndexTable;
    }

    get filters() {
        return [];
    }

    get operationContext() {
        return this.props.granted ? 'granted' : 'locked';
    }

    get constraints() {
        const {userKey, granted} = this.props;
        const type = granted ? 'grantedToUser' : 'lockedForUser';


        return (
            <React.Fragment>
                <Filters.ModelParameter constraint={type} modelKey={userKey}/>
            </React.Fragment>
        );
    }

    get actions() {
        const {model, userKey, granted} = this.props;

        if (granted) return null;

        return (
            <div className="table-actions">
                <Actions.Trigger
                    label={'Grant'}
                    targetOperationName={'index'}
                    operationName={'grant'}
                    data={({user: model.get(userKey)})}
                    className={'button small button--pink'}
                />
            </div>
        );
    }

    get columns() {
        return (
            <React.Fragment>
                <Columns.Text name={'name'} label={'Navn'}/>
                <Columns.Text name={'description'} label={'Description'} />
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
