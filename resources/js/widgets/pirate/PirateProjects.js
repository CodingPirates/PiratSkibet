import React from 'react';
import Widget from 'widgets/Widget';
import {Collection, Iterator} from '@morningtrain/react-resources';
import * as Filters from 'support/filters';
import * as Auth from '@morningtrain/react-auth';
import * as Displays from "support/displays";
import Section from 'layouts/Section';
import Paper from "layouts/Paper";
import Link from "widgets/navigation/Link";
import WhenCollection from 'support/conditionals/WhenCollection';
import Project from 'widgets/projects/Project';
import {inject} from '@morningtrain/react-decorators';

@inject(['model'])
export default class PirateProjects extends Widget {

    static get defaultProps() {
        return {
            operationContext: null,
            renderEmpty:      false,
        }
    }

    renderEmpty() {
        const {title, id, renderEmpty} = this.props;

        if (!renderEmpty) return null;

        return (
            <Section id={id} className={'profile-projects-section'}>
                <h2>{title}</h2>
                <Paper size={'medium'}>
                    <Auth.Is modelKey={'id'}>
                        <p>Du har ikke nogen projekter på nuværende tidspunkt. Gå <Link route={'app.projects.create'}>her</Link> for at lave dit første projekt.</p>
                    </Auth.Is>
                    <Auth.Is modelKey={'id'} not={true}>
                        <p><Displays.Text name={'username'}/> har ikke nogen projekter.</p>
                    </Auth.Is>
                </Paper>
            </Section>
        );
    }

    renderWidget() {
        const {title, children, id, operationContext} = this.props;

        return (
            <Collection resourceName={'projects.project'} operationContext={operationContext} >
                <Filters.Static constraint={'$per_page'} value={3}/>
                {children}

                <WhenCollection empty={false}>
                    <Section id={id} className={'profile-projects-section'}>
                        <h2>{title}</h2>
                        <div className={'profile-projects project-results project-results--gallery'}>
                            <Iterator>
                                <Project/>
                            </Iterator>
                            <Filters.Pagination clearOnUnmount={false}/>
                        </div>
                    </Section>
                </WhenCollection>

                <WhenCollection empty={true}>
                    {this.renderEmpty()}
                </WhenCollection>
            </Collection>
        );
    }
}
