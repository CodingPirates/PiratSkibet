import React from "react";
import {Provider} from "mobx-react";
import debounce from "lodash/debounce";

export default class Badges extends React.Component {

    constructor(props) {
        super(props);

        this.state = {hasBadges: false};

        this.registerBadge.bind(this);
    }

    registerBadge = debounce(() => {
        this.setState({hasBadges: true});
    }, 100, {leading: true})

    renderChildren() {

        if(this.state.hasBadges === false) {
            return this.props.children;
        }

        return (
            <div className="thread-message__badges">
                {this.props.children}
            </div>
        );
    }

    render() {
        return (
            <Provider badgeManager={this}>
                <React.Fragment>
                    {this.renderChildren()}
                </React.Fragment>
            </Provider>
        );
    }

}
