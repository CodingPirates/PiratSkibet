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
        return 'backend.content.twitch_channel';
    }

    get layout() {
        return IndexTable;
    }

    get actions() {
        return (
            <div className="table-actions">
                <Link route={'backend.content.twitch_channels.edit'} label={'Rediger'} parameters={{twitch_channel:'model:id'}} />
                <Actions.Delete />
            </div>
        );
    }

    get columns() {
        return (
            <React.Fragment>
                <Columns.Text name={'channel_name'} label={'Kanal'}/>
                <Columns.Text name={'collection'} label={'Samling'}/>
                <Columns.Boolean name={'is_live'} label={'Er kanalen live?'} trueText={'Ja'} falseText={'Nej'}/>
            </React.Fragment>
        );
    }

    renderBeforeCrud() {
        return (
            <React.Fragment>
                <Link route={'backend.content.twitch_channels.create'} label={'Opret twich kanal'} className={'button button--yellow'} />
            </React.Fragment>
        );
    }
}
