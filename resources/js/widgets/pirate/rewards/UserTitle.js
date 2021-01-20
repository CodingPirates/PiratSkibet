import React from "react";
import * as Displays from "support/displays";
import {Trigger} from "@morningtrain/react-resources";
import {inject} from "@morningtrain/react-decorators";
import RefreshOnSuccess from "@morningtrain/react-resources/src/RefreshOnSuccess";
import * as Auth from "@morningtrain/react-auth";

@inject(['model'])
export default class UserTitle extends React.Component {

    static get defaultProps() {
        return {
            userId: null
        }
    }

    get selected() {
        return this.props.model.get('selected_by_user');
    }

    get selectable() {
        return Auth.is(this.props.userId) && !this.selected;
    }

    get classNames() {
        return [
            'user-title',
            this.selected ? 'selected' : null,
        ].filter(e => e).join(' ');
    }

    render() {
        return (
            <div className={this.classNames}>
                <Displays.Heading level={5} name={'title'} />
                <Auth.Check>
                    {this.selectable ?
                        ( <Trigger resourceName={'rewards.user_title'} operationName={'select'} label={'Vælg som aktiv rolle'}
                                   refreshOnSuccess={false} operationContext={{id: this.props.model.get('id')}}
                                   className={'button button--pink'}>
                            <RefreshOnSuccess target={'api.rewards.user_reward.opened'} />
                        </Trigger>) : null}
                </Auth.Check>
            </div>
        );
    }
}
