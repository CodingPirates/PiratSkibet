import React from "react";
import {inject} from "@morningtrain/react-decorators";

@inject(['badgeManager'])
export default class Badge extends React.Component {

    constructor(props) {
        super(props);

        let {badgeManager} = this.props;
        if(badgeManager) {
            badgeManager.registerBadge();
        }

    }

    static get defaultProps() {
        return {
            color: 'grey',
            label: ''
        };
    }

    get content() {
        const {label, children} = this.props;

        return label || children;
    }

    render() {
        return (
            <div className={'thread-message__badge thread-message__badge--' + this.props.color}>
                {this.content}
            </div>
        );
    }

}
