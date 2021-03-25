import React from "react";
import Widget from "widgets/Widget";
import Logo from "widgets/navigation/Logo";
import NavigationBurger from "widgets/navigation/NavigationBurger";
import NavigationScrollHandler from "helpers/NavigationScrollHandler";
import Login from "widgets/auth/Login";
import Register from "widgets/auth/Register";
import * as Auth from "@morningtrain/react-auth";
import User from "widgets/user/User";
import {router} from "@morningtrain/helpers";
import Link from "widgets/navigation/Link";
import Section from "layouts/Section";
import Notifications from "widgets/notifications/Notifications";
import LandlubberBanner from "widgets/landlubber/LandlubberBanner";
import {inject} from "@morningtrain/react-decorators";
import LiveIndicator from 'widgets/tv/LiveIndicator';
import MeetingBanner from 'widgets/jitsi/MeetingBanner';

@inject(["auth"])
export default class Navigation extends Widget {

    constructor(props) {
        super(props);
        this.state = { scrolled: false }

        this.navigationScroll = new NavigationScrollHandler({
            scrollDistance: this.props.scrollDistance,
            onEnter: () => {

                if(this.state.scrolled) {
                    return;
                }

                this.setState({ scrolled: true })
            },
            onExit: () => {

                if(!this.state.scrolled) {
                    return;
                }

                this.setState({ scrolled: false })
            }
        });
    }

    static get defaultProps() {
        return {
            scrollDistance: 100
        };
    }

    componentDidMount() {
        this.navigationScroll.init();
    }

    componentWillUnmount() {
        this.navigationScroll.destroy();
    }

    get logo() {
        return (
            <Link route={'app.home.index'} className="navigation__logo" >
                <Logo />
            </Link>
        )
    }

    get menuItems() {
        return (
            <div className="navigation__item-wrap">
                <div className="navigation__items-wrap">
                    <ul className="navigation__items navigation__mobile-menu">
                        <li className="navigation__item">
                            <Link className="navigation__link" route={'app.pages.posts'} parameters={{path: 'piratsnak'}}>Piratsnak</Link>
                        </li>
                        <li className="navigation__item">
                            <Link className="navigation__link" route={'app.projects.overview'}>Showcases</Link>
                        </li>
                        <li className="navigation__item">
                            <Link className="navigation__link" route={'app.courses.overview'}>Kodehavet</Link>
                        </li>
                        <li className="navigation__item navigation__item--has-badge">
                            <Link className="navigation__link" route={'app.tv.index'}>
                                Coding Pirates TV
                                <LiveIndicator/>
                            </Link>
                        </li>
                        <li className="navigation__item">
                            <Link className="navigation__link" route={'app.pages.about'}>Om Piratskibet</Link>
                        </li>
                        <li className="navigation__hidden-desktop">
                            <ul className="navigation__items">
                                <li className="navigation__item">
                                    <Auth.Check>
                                        <User className="navigation__user"/>
                                    </Auth.Check>
                                    <Register className="button button--yellow" />
                                </li>
                                <li className="navigation__item">
                                    <Login className="button button--yellow" />
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <ul className="navigation__items navigation__items--buttons">
                    <Auth.Check negate={true}>
                        <li className="navigation__item">
                            <Register className="button button--yellow small" />
                        </li>
                    </Auth.Check>
                    <Auth.Check>
                        <li className="navigation__item--notifications">
                            <Notifications />
                        </li>
                        <li className="navigation__item">
                            <User className="navigation__user"/>
                        </li>
                    </Auth.Check>
                    <li className="navigation__item">
                        <Login className="button button--yellow small" />
                    </li>
                </ul>
            </div>
        )
    }

    get classList() {
        const classes = {
            'navigation': true,
            'navigation--scrolled': this.state.scrolled || this.props.auth.can('upgrade_to_pirate'),
            'navigation--upgrade': this.props.auth.can('upgrade_to_pirate')
        }

        return Object
            .entries(classes)
            .filter(entry => entry[1])
            .map(entry => entry[0])
            .join(' ');
    }

    renderWidget() {
        return (
            <React.Fragment>
                <div className={'navigation navigation-spacing'} />
                <div id="navigation" className={this.classList}>
                    <Section>
                        {this.logo}
                        <div className={'navigation__item-wrap-outer'}>
                            <NavigationBurger>
                                {this.menuItems}
                            </NavigationBurger>
                        </div>
                    </Section>
                    <LandlubberBanner/>
                    <MeetingBanner/>
                </div>
            </React.Fragment>
        );
    }
}
