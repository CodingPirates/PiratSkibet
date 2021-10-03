import React from "react";
import Widget from "widgets/Widget";
import {Collection, Iterator} from "@morningtrain/react-resources";
import WhenCollection from "support/conditionals/WhenCollection";
import Section from "layouts/Section";
import * as Filters from "support/filters";
import Project from "widgets/projects/Project";
import ViewToggle from "widgets/projects/ViewToggle";
import Link from "widgets/navigation/Link";
import * as Auth from "@morningtrain/react-auth";
import { Env, router } from '@morningtrain/helpers'
import {inject} from "@morningtrain/react-decorators";
import VideoBot from 'widgets/video-bot/VideoBot';

@inject('auth')
export default class ProjectsOverview extends Widget {

    constructor(props) {
        super(props);

        this.categoryTags = React.createRef();
        this.changeView = this.changeView.bind(this);

        this.state = {
            ...super.state,
            view: 'gallery', // ['gallery', 'list']
            sidebarOpen: false
        }
    }

    get classNames() {
        return `project-results project-results--${this.state.view}`
    }

    get filterIcon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15">
                <g>
                    <rect y="6.67" width="1.67" height="1.67"/>
                    <rect x="1.67" y="5" width="1.67" height="1.67"/>
                    <rect x="1.67" y="8.33" width="1.67" height="1.67"/>
                    <rect x="3.33" y="10" width="1.67" height="1.67"/>
                    <rect x="3.33" y="3.33" width="1.67" height="1.67"/>
                    <polygon points="18.33 0 18.33 5 8.33 5 8.33 3.33 8.33 1.67 6.67 1.67 5 1.67 5 3.33 6.67 3.33 6.67 5 6.67 6.67 8.33 6.67 18.33 6.67 18.33 8.33 8.33 8.33 6.67 8.33 6.67 10 6.67 11.67 5 11.67 5 13.33 6.67 13.33 8.33 13.33 8.33 11.67 8.33 10 18.33 10 18.33 15 20 15 20 0 18.33 0"/>
                </g>
                <g>
                    <polygon style={{fill: '#FFF200'}} points="6.67 6.67 6.67 3.33 5 3.33 5 5 3.33 5 3.33 6.67 1.67 6.67 1.67 8.33 3.33 8.33 3.33 10 5 10 5 11.67 6.67 11.67 6.67 8.33 18.33 8.33 18.33 6.67 6.67 6.67"/>
                </g>
            </svg>
        )
    }

    changeView(view) {
        this.setState({view: view});
    }

    toggleSidebar() {
        this.setState(prevState => ({
            sidebarOpen: !prevState.sidebarOpen
        }));
    }

    get sidebarClass() {
        return this.state.sidebarOpen ? 'projects-container projects-container--open' : 'projects-container';
    }

    get filterButtonClass() {
        return this.state.sidebarOpen ? 'toggle-filter-sidebar toggle-filter-sidebar--open' : 'toggle-filter-sidebar';
    }

    get username() {
        return this.props.auth.user.get('username');
    }

    renderWidget() {
        return (
            <div className="projects-overview">
                <Section className={'project-header'} >
                    <h1>Showcase projekter_</h1>

                    <p>
                        Her kan du se en masse spændende projekter, som andre pirater arbejder på.
                    </p>
                    <p>
                        Hvis du vil lægge dit eget projekt op, så læs først <Link route={'app.pages.posts'} parameters={{path: 'projektregler'}} label={'projektreglerne'}/>.
                    </p>
                    <p>
                        Hvis du er i tvivl, kan du altid spørge i <a href={Env.get('services.discord.url', '#')} target='_blank'>Piratsnak</a>
                    </p>

                    <Auth.Can permission={'api.projects.project.create'}>
                        <div className={'button-wrap'}>
                            <Link label={'Opret projekt'} route={'app.projects.create'}
                                  className={'button button--pink'}/>
                            <Link label={'Dine projekter'} route={'app.pirate.pirate'}
                                  parameters={{0: '#user_projects', username: this.username}}
                                  className={'button button--blue'}/>
                        </div>
                    </Auth.Can>
                </Section>

                <Section className={'projects-content'} >
                    <VideoBot position={'fixed'} />
                    <Collection resourceName={'projects.project'}>
                        <div className={'filter-bar'} >
                            <span className={'subtitle'}>showcase</span>
                            <div className={'filter-bar__filters filter-bar__filters--inputs'}>
                                <div className="search-wrap">
                                    <Filters.Search defaultValue={router.parameter('search')}/>
                                </div>
                                <div className="select-wrap">
                                    <Filters.Enum constraint={'$order'} enum={'generic_order_type'} />
                                </div>
                            </div>
                            <div className={'filter-bar__filters'}>
                                <ViewToggle view={'gallery'} active={this.state.view} onChange={this.changeView} />
                                <ViewToggle view={'list'} active={this.state.view} onChange={this.changeView} />
                            </div>
                        </div>

                        <button className={this.filterButtonClass} onClick={this.toggleSidebar.bind(this)}>
                            {this.filterIcon} Søg efter kategori
                        </button>

                        <div className={this.sidebarClass} >
                            <div className={'projects-categories'} >
                                <Filters.ProjectCategory tagsElement={this.categoryTags} />
                            </div>
                            <div className={'projects-container-inner'} >
                                <div ref={this.categoryTags} className={'category-tags'} />
                                <div className={this.classNames} >
                                    <WhenCollection empty={true}>
                                        <p className={'missing-results'}>Ups, vi kunne ikke finde nogen projekter</p>
                                    </WhenCollection>
                                    <WhenCollection empty={false}>
                                        <Iterator>
                                            <Project type={this.state.view} />
                                        </Iterator>
                                    </WhenCollection>
                                </div>
                                <Filters.Pagination/>
                            </div>
                        </div>
                    </Collection>
                </Section>

            </div>
        );
    }
}
