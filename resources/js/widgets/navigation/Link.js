import React from "react";
import {inject} from "@morningtrain/react-decorators";
import {Env, router} from "@morningtrain/helpers";
import Operation from "@morningtrain/resources/src/Operation";
import Pipeline from "support/pipes/Pipeline";
import Pipe from "support/pipes/Pipe";

@inject(['auth', 'operation', 'model', 'router'])
class Link extends React.Component {

    static get defaultProps() {
        return {
            className: '',
            parameters: {},
            newTab: false,
            disableRouting: false,
        };
    }

    get isActive() {
        return this.props.route === Env.get('page.route');
    }

    get linkClassName() {

        let classNames = [this.props.className];

        if(this.isActive) {
            classNames.push('active');
        }

        return classNames.join(' ');
    }

    get linkProps() {
        const {newTab} = this.props;

        let props = {
            href: this.href,
            onClick: this.handleClick,
            className: this.linkClassName
        };

        if (newTab) props.target = '_blank';

        return props;
    }

    get label() {

        if (this.props.label) {
            return this.props.label;
        }

        return this.renderChildren();
    }

    get children() {
        return React.Children.toArray(this.props.children);
    }

    renderChildren() {
        if (this.children.length === 0) {
            return [];
        }

        return this.children.map((child, index) => {
            if(typeof child === 'string') {
                return child;
            }
            return React.cloneElement(child, {key: index, clickable: this});
        });
    }

    get href() {
        const {href, route} = this.props;

        if (href) {
            return href;
        }

        if (route) {
            return router.route(route, this.routeParams);
        }

        return '#';
        //throw new Error('Route could not be found.');
    }

    getParameterValue(value) {

        if(Array.isArray(value)) {
            let values = [];

            value.forEach(value => {
                values.push(this.getParameterValue(value));
            });

            return values;
        }

        if (typeof value !== 'string') return value;

        const {model} = this.props;

        if (value.startsWith('model:') && model) {
            const key = value.split('model:')[1];

            return model.get(key);
        }

        // TODO dot notation
        // TODO route case

        return value;
    }

    get routeParams() {
        const {parameters} = this.props;

        const res = {};

        Object.keys(parameters).forEach(key => {
            res[key] = this.getParameterValue(parameters[key]);
        });

        return res;
    }

    get differentNamespace() {
        const {route} = this.props;

        if (!route) return true;

        const operation = Operation.fromRoute(route);

        return Env.get('page.namespace') !== operation.getEnv('namespace');
    }

    shouldOpenInNewTab(e) {

        if (
            this.props.newTab ||
            e.ctrlKey ||
            e.shiftKey ||
            e.metaKey || // apple
            (e.button && e.button == 1) // middle click, >IE9 + everyone else
        ) {
            return true;
        }

        return false;
    }

    shouldPreventDefault(e) {

        if(this.shouldOpenInNewTab(e)) {
            return false;
        }

        if (
            this.props.disableRouting === true ||
            this.differentNamespace
        ) {
            return false;
        }

        return true;
    }

    handleClick = (e) => {

        if (!this.pipeline) {
            return;
        }

        const shouldNavigate = this.shouldPreventDefault(e) && this.props.route;
        const shouldOpenInNewTab = this.shouldOpenInNewTab(e);

        e.preventDefault();

        return this.pipeline
            .trigger()
            .then(() => {
                if (typeof (this.props.onClick) === 'function') {
                    return this.props.onClick(e);
                }
            })
            .then(() => {
                if (shouldNavigate) {
                    this.props.router.navigate(this.props.route, this.routeParams);
                } else {
                    if(shouldOpenInNewTab) {
                        window.open(this.href);
                    } else {
                        location.href = this.href;
                    }
                }
            });

    }

    render() {

        if(this.props.route && !this.props.auth.can(this.props.route)) {
            return null;
        }

        return (
            <a {...this.linkProps} >
                <Pipeline ref={pipeline => this.pipeline = pipeline}>
                    {this.label}
                </Pipeline>
            </a>
        );
    }

}

export default Link;
