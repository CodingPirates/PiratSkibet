import React from "react";
import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import * as Auth from "@morningtrain/react-auth";
import * as Displays from "support/displays";
import Like from "widgets/interactions/reactions/Like";
import * as Actions from "support/actions/backend";
import {Iterator} from "@morningtrain/react-resources";
import TableList from "layouts/TableList";
import Link from "widgets/navigation/Link";
import Section from "layouts/Section";
import Badges from "widgets/forum/Badges";
import Badge from "widgets/forum/Badge";
import UserDisplay from "widgets/user/UserDisplay";
import Thread from "widgets/forum/Thread";
import Endorse from "widgets/interactions/reactions/Endorse";
import ImageSlider from "support/displays/ImageSlider";
import {Injected as Case} from "@morningtrain/react-fields/composites/Case";
import ProjectContextMenu from "widgets/menus/ProjectContextMenu";
import Confirm from "support/pipes/Confirm";

@inject(['model'])
export default class ProjectView extends Widget {

    get model() {
        return this.props.model;
    }

    renderInvitationResponse() {
        const props = {
            className: 'button button--pink small',
            operationName: 'resolve_invite',
            targetOperationName: 'read',
        };

        return (
            <Auth.Can permission={'api.projects.project.resolve_invite'}>
                <Actions.Trigger {...props} label={'Afslå invitation'} className={'button button--yellow small'} data={({reply: false})}/>
                <Actions.Trigger {...props} label={'Accepter invitation'} className={'button button--pink small'} data={({reply: true})}/>
            </Auth.Can>
        );
    }

    renderThread() {

        const thead_id = this.model.get('thread_id');

        if (!thead_id) {
            return null;
        }

        return (
            <React.Fragment>
                <Section className={'forum-title-wrap'}>
                    <h2>Chat om showcase projektet_</h2>
                </Section>
                <Thread id={thead_id} hasWorld={false} wrapperClass={'forum-wrap'} />
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className={'project-view'}>
                <Section className={'project-header'}>
                    <div className={'project-title-wrap'}>
                        <Displays.Heading name={'title'}/>
                        <ProjectContextMenu/>
                    </div>
                </Section>

                <Section className={'project-edit project-header'}>
                    <Link className={'button button--grey button--arrow-left small'}
                          route={'app.projects.overview'}
                          label={'Tilbage til oversigten'} />

                    <div className={'project-edit project-save buttons-wrap'}>
                        <Auth.Can permission={'api.projects.project.store'}>
                            <Link className={'button button--pink small'}
                                  route={'app.projects.edit'}
                                  parameters={{project: this.model.get('id')}}
                                  label={'Rediger'}/>
                        </Auth.Can>
                        {this.renderInvitationResponse()}
                    </div>
                </Section>

                <Section className={'project-header'}>
                    <Like resourceName={'projects.project'}
                          count={this.model.get('likes_count')}
                          reacted={!!this.model.get('my_likes_count')}
                    />

                    <Endorse resourceName={'projects.project'}
                             count={this.model.get('endorsements_count')}
                             reacted={!!this.model.get('my_endorsements_count')}
                    />
                </Section>

                <Section className={'project-content'}>
                    <div className={'project-inner-content'}>
                        <div className={'project-banner'}>
                            <Displays.Image name={'cover_image_url'}/>
                        </div>
                        <div className={'project-info'}>
                            <TableList title={'Projekt Information'}>
                                <Displays.Html name={'description'}/>
                            </TableList>
                        </div>
                        <Case name={'images'} exists={true}>
                            <TableList title={'Billeder'}>
                                <div className={'project-images'}>
                                    <ImageSlider name={'images'} />
                                </div>
                            </TableList>
                        </Case>
                    </div>
                    <div className={'project-inner-content'}>
                        <div>
                            <TableList title={'Kategorier'}>
                                <Badges>
                                    <Iterator collection={this.model.get('categories')}>
                                        <Badge color={'yellow'}>
                                            <Link route={'app.projects.overview'} parameters={{'categories': ['model:id']}}>
                                                <Displays.Text name={'parent.name'}/>: <Displays.Text name={'name'}/>
                                            </Link>
                                        </Badge>
                                    </Iterator>
                                </Badges>
                            </TableList>

                            <TableList title={'Holdet bag projektet'}>
                                <div className={'thread-message__user-wrap'}>
                                    <UserDisplay model={this.model.get('owner')}/>
                                </div>
                                <Auth.Can permission={'manage_project_members'} forceModel={true}>
                                    <Iterator collection={this.model.get('all_users')}>
                                        <div className={'thread-message__user-wrap'}>
                                            <UserDisplay>
                                                <Displays.Boolean name={'pivot.accepted'} trueText={''} falseText={<div className={'thread-message__user-status thread-message__badge thread-message__badge--pink'}>Inviteret</div>} />
                                            </UserDisplay>
                                        </div>
                                    </Iterator>
                                </Auth.Can>

                                <Auth.Can permission={'manage_project_members'} forceModel={true} negate={true}>
                                    <Iterator collection={this.model.get('members')}>
                                        <div className={'thread-message__user-wrap'}>
                                            <UserDisplay/>
                                        </div>
                                    </Iterator>
                                </Auth.Can>
                            </TableList>

                            <Case name={'files'} exists={true}>
                                <Auth.Can permission={'api.projects.project.download'} negate={true} >
                                    <TableList title={'Filer'}>
                                        <p>Du skal være logget ind for at kunne tilgå projektets filer.</p>
                                    </TableList>
                                </Auth.Can>
                                <Auth.Can permission={'app.projects.download'} >
                                    <TableList title={'Filer'} titleRight={(
                                        <React.Fragment>
                                            <Link route={'app.projects.download'} parameters={{project: 'model:id'}} >
                                                <Confirm confirm={'Download filer'} cancel={'Annuller'} label={'Download filer'}>
                                                    <div className="modal-content--padding">
                                                        <p>Du er ved at hente alle projektets filer.</p>
                                                        <p>Du skal være opmærksom på, at filerne kan være usikre og at det er på eget ansvar, at du henter og åbner dem.</p>
                                                    </div>
                                                </Confirm>
                                                <div className={'download-files'}>Hent filer</div>
                                            </Link>
                                        </React.Fragment>
                                    )}>
                                        <Iterator collection={this.model.get('files')}>
                                            <Displays.Link className={'file-row'} name={'url'} >
                                                <div className={'file-name'}>
                                                    <Displays.Text name={'filename'} />
                                                </div>
                                                <div className={'file-meta-values'}>
                                                    <Displays.Filesize />
                                                </div>
                                            </Displays.Link>
                                        </Iterator>
                                    </TableList>
                                </Auth.Can>
                            </Case>

                        </div>
                    </div>

                </Section>

                {this.renderThread()}

            </div>
        );
    }
}
