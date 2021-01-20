import React from "react";
import Widget from "widgets/Widget";

export default class DropdownMenu extends Widget {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.listRef    = React.createRef();
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    //////////////////////////////////
    /// Menu toggle helpers
    //////////////////////////////////

    componentDidUpdate() {
        this.state.open ?
            document.addEventListener("click", this.closeAway) :
            document.removeEventListener("click", this.closeAway);
    }

    closeAway = (e) => {
        const {current} = this.listRef;
        const clickedInsideArea = current ?
            current.contains(e.target) :
            false;

        if (!clickedInsideArea) this.setState({open: false});
    }

    toggleMenu() {
        this.setState({open: !this.state.open});
    }

    //////////////////////////////////
    /// Class helpers
    //////////////////////////////////

    get baseClass() {
        return 'dropdown-menu';
    }

    get iconClass() {
        return 'dropdown-menu-icon';
    }

    get listClass() {
        return this.state.open ?
            `${this.baseClass} ${this.baseClass}--open` :
            this.baseClass;
    }

    //////////////////////////////////
    /// Rendering
    //////////////////////////////////

    renderListContent() {
        return null;
    }

    renderListFooter() {
        return null;
    }

    renderList() {
        return (
            <div className={this.listClass} ref={this.listRef}>
                <div className={'dropdown-menu-content'}>
                    {this.renderListContent()}
                </div>
                <div className={'dropdown-menu-footer'}>
                    {this.renderListFooter()}
                </div>
            </div>
        );
    }

    renderHandle() {
        return (
            <div onClick={this.toggleMenu}>
                {this.renderHandleContent()}
            </div>
        );
    }

    renderWidget() {
        return (
            <React.Fragment>
                {this.renderHandle()}
                {this.renderList()}
            </React.Fragment>
        );
    }

}
