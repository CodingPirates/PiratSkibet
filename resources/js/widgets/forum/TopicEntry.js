import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import Link from "widgets/navigation/Link";
import {Text, TimeSince} from "support/displays";

@inject(['model'])
export default class TopicEntry extends Widget {

    constructor(props) {
        super(props);
    }

    get id() {
        return this.props.model.get('id');
    }

    get slug() {
        return this.props.model.get('slug');
    }

    renderWidget() {
        return (
            <Link route={'app.forum.topic'} parameters={{topic: this.id, topic_slug: this.slug}} className="custom-table-row forum-topic">
                <div>
                    <div className="custom-table-row__title">
                        <Text name={'name'} />
                    </div>
                    <div className="custom-table-row__description">
                        <Text name={'description'} />
                    </div>
                </div>
                <div className="custom-table-row__info-wrap">
                    <div className="custom-table-row__info custom-table-row__info--entries">
                        <Text name={'descendant_threads_count'} />
                        <span> indlæg</span>
                    </div>
                    <div className="custom-table-row__info custom-table-row__info--activity align-text-right">
                        <TimeSince name={'latest_message.updated_at'} />
                    </div>
                </div>
            </Link>
        );
    }

}
