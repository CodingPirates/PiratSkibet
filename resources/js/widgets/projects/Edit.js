import React from 'react';
import CrudPage from '@morningtrain/react-crud/CrudPage';
import {inject} from '@morningtrain/react-decorators';
import EditForm from '@morningtrain/react-crud/layouts/read/EditForm';
import * as Fields from 'support/fields';
import * as Filters from 'support/filters';
import * as Auth from '@morningtrain/react-auth';
import Link from 'widgets/navigation/Link';
import ForumWorld from 'widgets/animations/worlds/ForumWorld';
import {Trigger} from '@morningtrain/react-resources';
import Section from 'layouts/Section';
import WhenModel from 'support/conditionals/WhenModel';
import UserDisplay from 'widgets/user/UserDisplay';
import * as Displays from 'support/displays';
import RedirectOnSuccess from '@morningtrain/react-resources/src/RedirectOnSuccess';
import TableList from 'layouts/TableList';
import ConfirmModal from 'support/modals/Confirm';

@inject(['router'])
export default class Edit extends CrudPage {

    get resourceName() {
        return 'projects.project';
    }

    get layout() {
        return EditForm;
    }

    get unauthorizedRoute() {
        return 'app.projects.overview';
    }

    get createRoute() {
        return 'app.projects.edit';
    }

    get crudProps() {
        return {
            ...super.crudProps,
            shouldRenderActions: false
        }
    }

    get actions() {
        return (
            <div className={'project-edit project-save'}>
                <div className={'buttons-wrap'}>
                    <Auth.Can permission={'api.projects.project.delete'} forceModel={true}>
                        <Trigger className={'button button--yellow small'} operationName={'delete'} label={'Slet projekt'} >
                            <ConfirmModal confirm={'Slet projekt'} cancel={'Annuller'} label={'Slet projekt'}>
                                <div className={'modal-content--padding'}>
                                    <p>Er du sikker på du vil slette dette projekt?</p>
                                </div>
                            </ConfirmModal>
                            <RedirectOnSuccess route={'app.projects.overview'}/>
                        </Trigger>
                    </Auth.Can>
                    <input type={'submit'} className={'small'} value={'Gem mine ændringer'} />
                </div>
            </div>
        );
    }

    get fields() {
        return (
            <React.Fragment>

                <Section className={'project-edit project-header'}>
                    <WhenModel>
                        <Link className={'button button--grey button--arrow-left small'}
                              route={'app.projects.project'}
                              label={'Tilbage uden at gemme'}
                              parameters={{project:'model:id'}} />
                    </WhenModel>
                    <WhenModel exists={false}>
                        <Link className={'button button--grey button--arrow-left small'}
                              route={'app.projects.overview'}
                              label={'Tilbage til oversigten'} />
                    </WhenModel>
                    {this.actions}
                </Section>


                <Section className={'project-view project-edit project-content'}>

                    <div className={'project-content'}>
                        <div className={'project-inner-content'}>
                            <div className={'project-info'}>
                                <TableList title={'Detaljer om projektet'}>
                                    <Fields.Input name={'title'} placeholder={'Titel'}
                                                  label={'Titel'} required={true}/>
                                    <Fields.Select name={'status'} label={'Projektets status'}
                                                   required={true} placeholder={'Vælg status'}
                                                   options={{draft: 'Ikke synligt for andre', published: 'Synligt for andre'}}
                                                   description={'Her vælger du, om projektet skal være synligt for andre i Showcase. Husk at et projekt ikke behøver være færdigt, før du deler det med andre. På den måde kan du få hjælp, kommentarer og idéer fra andre, mens du udvikler dit projekt.'}
                                    />
                                    <Fields.Editor name={'description'}
                                                   simple={true}
                                                   placeholder={'Information...'}
                                                   label={'Projekt Information'}/>

                                </TableList>
                            </div>
                            <TableList title={'Kategorier'}>
                                <Fields.HasMany resourceName={'projects.category'}
                                                name={'categories'} label={'Kategorier'}
                                                optionsKey={'display_name'}
                                                beforeField={
                                                    <React.Fragment>
                                                        <Filters.Static constraint={'children'} value={'true'} />
                                                        <WhenModel>
                                                            <Filters.RouteParameter constraint={'project'}/>
                                                        </WhenModel>
                                                        <WhenModel exists={false}>
                                                            <Filters.Static constraint={'project'} value={0}/>
                                                        </WhenModel>
                                                    </React.Fragment>
                                                }>
                                    <Fields.Hidden name={'id'} prefixName={false} />
                                </Fields.HasMany>
                            </TableList>

                            <TableList title={'Filer og billeder'}>
                                <Fields.Files name={'files'} label={''} maxFiles={20} />
                            </TableList>

                        </div>
                        <div className={'project-inner-content'}>
                            <div>

                                <TableList title={'Cover billeder'}>
                                    <div className={'file-fields-small'}>
                                        <Fields.Files name={'cover_image'} label={'Cover billede'} maxFiles={1}/>
                                        <Fields.Files name={'thumbnail'} label={'Thumbnail'} maxFiles={1}/>
                                    </div>
                                </TableList>

                                <Auth.Can permission={'manage_project_members'} forceModel={true}>
                                    <div className={'edit-team-wrap'}>
                                        <TableList title={'Holdet bag projektet'}>
                                            <Fields.MemberManager modelName={'all_users'} name={'users'} >
                                                <UserDisplay>
                                                    <Fields.Case name={'pivot.accepted'} exists={false} >
                                                        <Displays.Boolean name={'pivot.accepted'}
                                                                          trueText={''}
                                                                          falseText={<div className={'thread-message__user-status thread-message__badge thread-message__badge--yellow'}>Gem for at invitere</div>}/>
                                                    </Fields.Case>
                                                    <Fields.Case name={'pivot.accepted'} exists={true} >
                                                        <Displays.Boolean name={'pivot.accepted'}
                                                                          trueText={''}
                                                                          falseText={<div className={'thread-message__user-status thread-message__badge thread-message__badge--pink'}>Inviteret</div>}/>
                                                    </Fields.Case>
                                                </UserDisplay>
                                            </Fields.MemberManager>
                                        </TableList>
                                    </div>
                                </Auth.Can>

                            </div>
                        </div>

                    </div>

                </Section>
            </React.Fragment>
        );
    }

    renderBeforeCrud() {
        return (
            <React.Fragment>
                <ForumWorld classNames={"forum-world"} />
            </React.Fragment>
        );
    }

}
