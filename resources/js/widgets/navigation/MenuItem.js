import React from "react";
import Widget from "widgets/Widget";
import Link from "widgets/navigation/Link";
import {Env, router} from "@morningtrain/helpers";
import * as Auth from "@morningtrain/react-auth";

export default class MenuItem extends Widget {

    ///////////////////////////
    /// Events handlers
    ///////////////////////////

    toggleSubMenu = (e) => {

        if (!this.hasChildren) {
            return;
        }

        const navItem = e.target.parentNode;
        const subItemsHeight = navItem.querySelector('.side-navigation__sub-items').offsetHeight;
        const navSubWrap = navItem.querySelector('.side-navigation__sub-wrap');
        const navToggle = navItem.querySelector('.side-navigation__toggle');

        navSubWrap.classList.toggle('side-navigation__sub-wrap--open');
        navToggle.classList.toggle('side-navigation__toggle--open');

        if (navSubWrap.classList.contains('side-navigation__sub-wrap--open')) {
            navSubWrap.style.maxHeight = subItemsHeight + 'px';
        } else {
            navSubWrap.style.maxHeight = '0px';
        }
    }

    ///////////////////////////
    /// Getters
    ///////////////////////////

    get hasChildren() {
        return React.Children.count(this.props.children) > 0;
    }

    get hasLink() {
        return !!this.props.route;
    }

    get label(){
        if(this.props.label) {
            return this.props.label;
        }

        if(this.hasLink) {
            let fragments = ('resources.'+this.props.route).split('.');
            let last = fragments.pop();
            return Env.get([...fragments, 'operations', last, 'title'].join('.'));
        }

        return this.props.label;
    }

    ///////////////////////////
    /// Active Helpers
    ///////////////////////////

    get isActive() {

        if(this.props.route && this.isRouteActive(this.props.route)) {
            return true;
        }

        return this.hasActiveChildren(this.props.children);
    }

    get activeClass() {
        if (this.isActive) {
            if(!this.props.isChild) {
                return 'side-navigation__item--active';
            }
            return 'side-navigation__sub-item--active';
        }

        return '';
    }

    hasActiveChildren(children) {

        children = React.Children.toArray(children);

        if (children.length === 0) {
            return false;
        }

        for (let i = 0; i < children.length; i++) {
            let child = children[i];

            if (!child.props) {
                continue;
            }

            if (child.props.route && this.isRouteActive(child.props.route)) {
                return true;
            }

            if (this.hasActiveChildren(child.props.children)) {
                return true;
            }
        }

        return false;
    }

    isRouteActive(route) {

        let parent = Env.get('page.parent');
        if(route && route === parent) {
            return true;
        }

        return route === router.currentRoute;
    }

    ///////////////////////////
    /// Classes
    ///////////////////////////

    get itemClassNames() {
        return [
            (this.props.isChild === true)?'side-navigation__sub-item':'side-navigation__item',
            this.activeClass
        ].filter(i => i).join(' ');
    }

    get linkClassNames() {
        return [
            (this.props.isChild === true)?'side-navigation__sub-link':'side-navigation__link'
        ].filter(i => i).join(' ');
    }

    ///////////////////////////
    /// Rendering
    ///////////////////////////

    renderChildren() {
        if(React.Children.count(this.props.children) === 0) {
            return null;
        }

        return React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {isChild: true})
        });
    }

    renderSubmenu() {

        if (!this.hasChildren) {
            return null;
        }

        const isOpen = this.isActive;

        return (
            <React.Fragment>
                <div className={"side-navigation__toggle"+(isOpen?' side-navigation__toggle--open':'')} onClick={this.toggleSubMenu}></div>
                <div className={'side-navigation__sub-wrap'+(isOpen?' side-navigation__sub-wrap--open':'')}>
                    <ul className={'side-navigation__sub-items'}>
                        {this.renderChildren()}
                    </ul>
                </div>
            </React.Fragment>
        );
    }

    renderItem() {
        return (

            <li className={this.itemClassNames}>
                {
                    this.hasLink ? (
                        <Link className={this.linkClassNames} route={this.props.route} label={this.label} onClick={this.toggleSubMenu}/>
                    ) : (
                        <div className={this.linkClassNames} onClick={this.toggleSubMenu}>{this.label}</div>
                    )
                }
                {this.renderSubmenu()}
            </li>
        );
    }

    renderWidget() {

        if (this.props.route) {
            return (
                <Auth.Can permission={this.props.route}>
                    {this.renderItem()}
                </Auth.Can>
            )
        }

        return this.renderItem();
    }

    /*

                        <li className={`side-navigation__item side-navigation__item--has-sub${this.activeLink(['backend.forum.index_topics', 'backend.forum.edit_topic'])}`}>
                            <Link className="side-navigation__link" route={'backend.forum.index_topics'} label={'Forum Emmner'} />
                            <div className="side-navigation__toggle" onClick={e => this.toggleSubMenu(e)}></div>

                            <div className={'side-navigation__sub-wrap'}>
                                <ul className={'side-navigation__sub-items'}>
                                    <li className={'side-navigation__sub-item side-navigation__sub-item--active'}>
                                        <a className={'side-navigation__sub-link'} href="#">Menu punkt 1</a>
                                    </li>
                                    <li className={'side-navigation__sub-item'}>
                                        <a className={'side-navigation__sub-link'} href="#">Menu punkt 2</a>
                                    </li>
                                    <li className={'side-navigation__sub-item'}>
                                        <a className={'side-navigation__sub-link'} href="#">Menu punkt 3</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
     */

}
