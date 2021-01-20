import Widget from "widgets/Widget";
import {Iterator} from "@morningtrain/react-resources";
import ParentTopic from "widgets/forum/ParentTopic";
import {inject} from "@morningtrain/react-decorators";

export default @inject(['collection'])
class ParentTopics extends Widget {

    get parents() {
        return this.props.collection[null].map(group => ({
            ...group,
            children: this.props.collection[group.id],
        }));
    }

    renderWidget() {
        return (
            <React.Fragment>
                <Iterator collection={this.parents}>
                    <ParentTopic/>
                </Iterator>
            </React.Fragment>
        );
    }
}
