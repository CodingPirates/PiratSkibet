import React from 'react';
import CurrentUserAvatar from "services/avatar/CurrentUserAvatar";
import {inject} from "@morningtrain/react-decorators";
import DropdownMenu from "widgets/menus/DropdownMenu";
import Logout from "widgets/auth/Logout";
import Link from "widgets/navigation/Link";
import UserSettingsModal from "widgets/user/UserSettingsModal";

@inject('auth')
export default class User extends DropdownMenu {

    constructor(props) {
        super(props);

        this.modal = React.createRef();
    }

    openModal() {
        this.modal.current.open();
    }

    //////////////////////////////////
    /// Class helpers
    //////////////////////////////////


    get listClass() {
        return super.listClass + ' user-dropdown-menu';
    }

    //////////////////////////////////
    /// Data helpers
    //////////////////////////////////

    get username() {
        return this.props.auth.user.get('username');
    }

    get title() {
        return this.props.auth.user.get('title');
    }

    //////////////////////////////////
    /// Rendering
    //////////////////////////////////

    renderListContent() {
        return (
            <div className={'user-menu-info-wrapper'} >
                <CurrentUserAvatar/>
                <div className={'user-menu-info-titles'}>
                    <div className={this.props.className + '__username'}>{this.username}</div>
                    <div className={this.props.className + '__title'}>{this.title}</div>
                </div>
            </div>
        );
    }


    renderListFooter() {
        return (
            <div className={'dropdown-menu-footer-buttons'}>
                <button className={'btn button button--blue small'} onClick={this.openModal.bind(this)} >Ret profil</button>
                <Link className={'btn button button--blue small'} route={'app.pirate.pirate'} parameters={{username:this.username}}>Se profil</Link>
                <Logout className={'button button--yellow small'} />
            </div>
        );
    }

    renderHandleContent() {
        return (
            <React.Fragment>
                <div className={this.props.className} >
                    <CurrentUserAvatar/>
                </div>
                <UserSettingsModal ref={this.modal} />
            </React.Fragment>
        );
    }

}
