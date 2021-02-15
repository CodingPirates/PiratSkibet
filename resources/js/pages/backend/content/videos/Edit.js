import CrudPage from "@morningtrain/react-crud/CrudPage";
import {inject} from "@morningtrain/react-decorators";
import EditForm from "@morningtrain/react-crud/layouts/read/EditForm";
import * as Fields from "support/fields";
import * as Displays from "support/displays";
import Link from "widgets/navigation/Link";
import {Fieldset} from "layouts";

export default
@inject(['router'])
class Edit extends CrudPage {

    get resourceName() {
        return 'backend.content.videos'
    }

    get layout() {
        return EditForm;
    }

    get actions() {
        return (
            <div className="form-actions">
                <Link route={'backend.content.videos.index'} label={'Tilbage til oversigten'} />
                <input type={'submit'} value={'gem'} />
            </div>
        );
    }

    get fields() {
        return (
            <React.Fragment>
                <Fieldset cols={2}>
                    <Fields.Input name={'video_id'} label={'Video ID'} required={true} />
                    <Fields.Checkbox name={'is_highlighted'} label={'Er videoen Highlighted?'} required={true} />
                    <Fields.Case name={'embed_id'} exists={true}>
                      <div style={{width: '50%'}}>
                        <Displays.YoutubeVideo name={'embed_id'}/>
                      </div>
                    </Fields.Case>
                </Fieldset>
              <br/>
            </React.Fragment>
        );
    }

}
