import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import Paper from "layouts/Paper";
import * as Displays from "support/displays";

@inject(['model'])
export default class Text extends Widget {

    constructor(props) {
        super(props);
    }

    get renderTitle() {
        return this.title ? <h1>{this.title}</h1> : '';
    }

    renderWidget() {
        return (
            <Paper>
                <Displays.Heading name={'meta.title'} level={2} />
                <Displays.Html name={'meta.text'} />
            </Paper>
        );
    }

}
