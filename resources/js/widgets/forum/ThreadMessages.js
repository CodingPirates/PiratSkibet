import Widget from "widgets/Widget";
import ThreadMessage from "widgets/forum/ThreadMessage";
import {Collection, Iterator} from "@morningtrain/react-resources";
import {inject} from "@morningtrain/react-decorators";
import * as Filters from "support/filters";
import * as Fields from "support/fields";
import {RefreshOnLoginReaction} from "@morningtrain/react-auth";
import WhenCollection from "support/conditionals/WhenCollection";

@inject(['model', 'auth'])
class ThreadMessages extends Widget {

    renderWidget() {
        return (
            <div className={'thread-messages'}>
                <Collection resourceName={'forum.message'} >
                    <Filters.Static constraint={'thread_id'} value={this.props.threadId} />
                    <Filters.Echo channel={'forum.thread.' + this.props.threadId} event={'message.created'} >
                        { (data) => {
                            if(data !== null && data.user_id === this.props.auth.user.get('id')) {
                                return (<Filters.Static constraint={'$page'} value={99999999} />);
                            }

                            return null;
                        }}
                    </Filters.Echo>
                    <RefreshOnLoginReaction />
                    <WhenCollection length={l => l > 3}>
                        <Filters.Pagination clearOnUnmount={false}/>
                    </WhenCollection>
                    <Iterator keyGenerator={(datum) => datum.id}>
                        <ThreadMessage thread={this.props.model} proxy={true} />
                    </Iterator>
                    <Filters.Pagination />
                    {this.props.children}
                </Collection>
            </div>
        );
    }

}

export default ThreadMessages;
