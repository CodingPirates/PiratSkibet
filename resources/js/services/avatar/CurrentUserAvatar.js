import React from 'react';
import Avatar from "./Avatar";
import {inject} from "@morningtrain/react-decorators";

export default
@inject("auth")
class UserAvatar extends React.Component {

    static get defaultProps() {
        return {
            embed: false
        }
    }

    get svg() {
        return this.props.auth.user.get('avatar') || '';
    }

    render() {
        return <Avatar svg={this.svg} embed={this.props.embed}/>
    }
}
