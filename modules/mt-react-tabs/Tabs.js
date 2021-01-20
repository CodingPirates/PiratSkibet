import React from "react";
import {Provider} from "mobx-react";
import {observable} from "mobx";

export default class Tabs extends React.Component {

    @observable tabs = new Map();
    @observable current_tab = this.props.defaultActive;

    constructor(props) {
        super(props);
    }

    isActive(slug) {
        return this.current_tab === slug;
    }

    setActive(slug) {
        this.current_tab = slug;
    }

    registerTab(slug, label) {
        this.tabs.set(slug, label);

        if (this.current_tab === '') {
            this.setActive(slug);
        }
    }

    render() {
        return (
            <Provider tabManager={this} >
                <React.Fragment>
                    {this.props.children}
                </React.Fragment>
            </Provider>
        );
    }
}

Tabs.defaultProps = {
    defaultActive: '',
};
