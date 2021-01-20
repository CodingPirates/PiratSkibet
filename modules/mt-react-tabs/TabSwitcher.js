import React from "react";
import {inject} from "@morningtrain/react-decorators";

export default
@inject(["tabManager"])
class TabSwitcher extends React.Component {

    get tabs() {
        return this.props.tabManager.tabs;
    }

    getClasses(slug) {
        return [
            this.props.tabManager.isActive(slug) ? 'active' : null,
            'mtt-tab'
            ]
            .filter(e => e)
            .join(' ');
    }

    switchTab(slug) {
        this.props.tabManager.setActive(slug);
    }

    renderTab(slug) {
        return (
            <div className={this.getClasses(slug)} key={slug} onClick={() => this.switchTab(slug)}>
                <span>{this.tabs.get(slug)}</span>
            </div>
        );
    }

    renderTabs() {
        return Array.from(this.tabs.keys()).map(this.renderTab.bind(this))
    }

    render() {
        return (
            <div>
                {this.renderTabs()}
            </div>
        );
    }
}
