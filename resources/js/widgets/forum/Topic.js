import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import {Model} from "@morningtrain/react-resources";
import * as Fields from "support/fields";
import {router} from "@morningtrain/helpers";
import React from "react";
import CreateThread from "widgets/forum/CreateThread";
import Topics from "widgets/forum/Topics";
import Threads from "widgets/forum/Threads";
import Breadcrumbs from "widgets/navigation/Breadcrumbs";
import {Text} from "support/displays";
import Section from "layouts/Section";

@inject(['model'])
class Topic extends Widget {

    constructor(props) {
        super(props);
    }

    get id() {
        return this.props.id;
    }

    renderWidget() {
        console.log(router.parameter('topic_id'));
        return (
            <React.Fragment>
                <Model resourceName={'forum.topics'} >
                    <Fields.Case name={'parent_id'} exists={true}>
                        {/*<a href={router.route('app.forum.topic', {})}>Tilbage</a>*/}
                    </Fields.Case>
                    <Section className={"forum-title"}>
                        <h1><Text name={'name'}/></h1>
                        <p>
                            <Text name={'description'} />
                        </p>
                    </Section>
                </Model>
                <Section>
                    <Breadcrumbs resourceName={'forum.topics'} constraints={{topic_id: this.id}} />
                </Section>
                <Topics parentId={this.id}/>
                <Threads topicId={this.id}/>
                <CreateThread topicId={this.id}/>
            </React.Fragment>
        );
    }

}

export default Topic;
