import React from "react";
import Navigation from "widgets/navigation/Navigation";
import * as Errors from "@morningtrain/react-errors";
import ShutdownWarning from "widgets/shutdown/ShutdownWarning";
import Chronos from "widgets/animations/Chronos";
import {Modal} from "support/modals";
import {Context} from '@morningtrain/react-modals';
import {Check} from "@morningtrain/react-auth";
import {router} from "@morningtrain/helpers";
import {inject} from '@morningtrain/react-decorators';
import ScrollIndicator from "widgets/general/ScrollIndicator";
import LoginForm from 'widgets/auth/LoginForm';
// import VideoBot from 'widgets/video-bot/VideoBot';

@inject(["auth"])
export default class BaseTemplate extends React.Component {

    static contextType = Context;

    componentDidMount() {
        if (router.parameter('promptLogin') === '1' && !this.props.auth.check()) {
            this.modalRepository.open('loginModal')
        }
    }

    get modalRepository() {
        return this.context;
    }

    render() {
        return (
            <React.Fragment>
                <Chronos>
                    <div className={"page-wrapper"}>
                        <Check negate={true}>
                            <Modal label='Log ind' name={'loginModal'}>
                                <LoginForm/>
                            </Modal>
                        </Check>
                        <Navigation />
                        <div className={"content"}>
                            <div className={"content-inner"}>
                                <Errors.Boundary>
                                    {this.props.children}
                                </Errors.Boundary>
                            </div>
                        </div>
                        <ShutdownWarning />
                    </div>
                </Chronos>
                <ScrollIndicator timeout={2000} />
            </React.Fragment>
        );
    }

}
