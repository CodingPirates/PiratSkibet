import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import {Iterator} from "@morningtrain/react-resources";
import TopicEntry from "widgets/forum/TopicEntry";
import Section from "layouts/Section";
import {Text} from "support/displays";

@inject(['model'])
export default class ParentTopic extends Widget {

    constructor(props) {
        super(props);
    }

    get id() {
        return this.props.model.get('id');
    }

    get slug() {
        return this.props.model.get('slug');
    }

    get children() {
        return this.props.model.get('children');
    }

    renderTopics() {
        if (!this.children) return null;

        return (
            <Iterator collection={this.children} >
                <TopicEntry/>
            </Iterator>
        );
    }

    renderWidget() {

        return (
            <Section>
                <div className="custom-table">
                    <div className="custom-table__titlebar">
                        <div className="custom-table__title">
                            <Text name={'name'} />_
                        </div>
                        <div className="custom-table__subtitles">
                            <div className="custom-table__title custom-table__title--subtitle">
                                Chats
                            </div>
                            <div className="custom-table__title custom-table__title--subtitle align-text-right">
                                Aktivitet
                            </div>
                        </div>
                    </div>
                    <div className="custom-table__list">
                        {this.renderTopics()}
                    </div>
                </div>
                <br/>
            </Section>
        );
    }

}
