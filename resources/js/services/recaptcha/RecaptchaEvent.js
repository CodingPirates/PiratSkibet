import React from "react";
import {inject} from "@morningtrain/react-decorators";
import {Env} from "@morningtrain/helpers";

@inject(['operation'])
export default class RecaptchaEvent extends React.Component {

    constructor(props) {
        super(props);

        this.beforeSubmit = this.beforeSubmit.bind(this);

        if (this.operation) {
            this.operation.beforeExecute(this.beforeSubmit);
        }
    }

    get operation() {
        return this.props.operation;
    }

    get siteKey() {
        return Env.get('recaptcha.key');
    }

    beforeSubmit(data) {
        const {props: {actionName}, siteKey} = this;

        if (!grecaptcha || !siteKey) return;

        return new Promise((resolve) => grecaptcha.ready(resolve()))
            .then(() => {
                return grecaptcha.execute(siteKey, {action: actionName})
            })
            .then(token => {
                data.set('token', token);

                return data;
            });
    }

    render() {
        return null;
    }

}
