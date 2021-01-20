import React from "react";
import {observable} from "mobx";
import {Provider} from "mobx-react";
import Widget from "widgets/Widget";
import * as Fields from "support/fields";
import * as Auth from "@morningtrain/react-auth";
import {Form, Operation} from "@morningtrain/react-resources";
import Login from "widgets/auth/Login";
import Register from "widgets/auth/Register";
import Link from "widgets/navigation/Link";

export default class ThreadPoster extends Widget {

    @observable data = new Map();

    constructor(props) {
        super(props);

        this.data.set('thread_id', props.threadId);

    }

    handleSubmit = (data) => {

        if (typeof(this.props.onSubmit) === 'function') {
            this.props.onSubmit(data);
        }

        if(this.editor && this.editor.wrappedInstance) {
            this.editor.wrappedInstance.clearEditor();
        }

    }

    renderWidget() {
        return (
            <React.Fragment>
                <Auth.Check negate={true} >
                    <Auth.RefreshOnLoginReaction />
                    <Auth.Can permission={'api.forum.thread.send'} forceModel={true} negate={true} >
                        <div className={'thread-not-logged-in'}>
                                <p>
                                    Hov, du kan ikke deltage i piratsnakken uden at være logget ind som Pirat!
                                </p>
                            <div className={'buttons-wrap'}>
                                <Login className={'button button--yellow'} />
                                <Register label={'Tilmeld dig'}  className={'button button--yellow'} />
                            </div>
                        </div>
                    </Auth.Can>
                </Auth.Check>
                <Auth.Can permission={'api.forum.thread.send'} forceModel={true} >
                    <Operation resourceName={'forum.thread'} operationName={'send'}>
                        <Auth.RefreshOnLoginReaction />
                        <Form submitTo={'send'} onSubmit={this.handleSubmit} flash={false}>
                            <Provider model={this.data} >
                                <React.Fragment>
                                    <Fields.Hidden name={'thread_id'} />
                                </React.Fragment>
                            </Provider>
                            <Fields.Comment label={''} name={'message'} ref={ref => this.editor = ref} />
                            <input type={'submit'} value={'Send'} className={'send-message-button'} />
                        </Form>
                        <p><b>Husk at <Link route={'app.pages.rules'} label={'“vi skal være gode ved hinanden”'}/></b></p>
                    </Operation>
                </Auth.Can>
            </React.Fragment>

        );
    }

}
