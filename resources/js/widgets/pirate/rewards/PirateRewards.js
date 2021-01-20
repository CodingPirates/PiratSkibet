import React from 'react';
import Widget from 'widgets/Widget';
import * as Tabs from '@morningtrain/react-tabs';
import * as Displays from 'support/displays';
import Section from 'layouts/Section';
import {Iterator, Collection, Model} from '@morningtrain/react-resources';
import AvatarItem from 'services/avatar/AvatarItem';
import UserReward from 'widgets/pirate/rewards/UserReward';
import {inject} from '@morningtrain/react-decorators';
import * as Auth from '@morningtrain/react-auth';
import PirateReward from 'widgets/pirate/rewards/PirateReward';
import UserTitle from 'widgets/pirate/rewards/UserTitle';
import WhenCollection from 'support/conditionals/WhenCollection';

@inject(['model'])
export default class PirateRewards extends Widget {

    get userId() {
        return this.props.model.get('id');
    }

    renderWidget() {
        return (
            <Section className={'profile-rewards-section'}>
                <Auth.Is modelKey={'id'}>
                    <h2>Min Skatteø_</h2>
                </Auth.Is>
                <Auth.Is modelKey={'id'} not={true}>
                    <h2><Displays.Text name={'username'}/>'s Skatteø_</h2>
                </Auth.Is>
                <Tabs.Tabs>
                    <div className='edit-avatar-tabs'>
                        <Tabs.TabSwitcher/>
                    </div>

                    <div className={'tabbed-content-wrap'}>

                        <Auth.Is id={this.userId}>
                            <Tabs.Tab slug='rewards' label='Skattekister'>
                                <Collection resourceName={'rewards.user_reward'}>
                                    <WhenCollection empty={false}>
                                        <Iterator>
                                            <Model proxy={true} operationName={'open'}>
                                                <UserReward/>
                                            </Model>
                                        </Iterator>
                                    </WhenCollection>
                                    <WhenCollection empty={true}>
                                        <p>Du har ikke nogle uåbnede skattekister.</p>
                                    </WhenCollection>
                                </Collection>
                            </Tabs.Tab>
                        </Auth.Is>

                        <Tabs.Tab slug='role' label='Roller'>
                            <PirateReward userId={this.userId} type={'USER_TITLE'}
                                          emptyText={'har ikke nogle roller.'}
                                          wrapperClass={'reward-avatar-item-wrap'}
                                          rewardsWrapperClass={'reward-avatar-item-wrap__items'}>
                                <UserTitle userId={this.userId}/>
                            </PirateReward>
                        </Tabs.Tab>

                        <Tabs.Tab slug='avatar' label='Avatar elementer'>
                            <PirateReward userId={this.userId} type={'AVATAR_ITEM'}
                                          emptyText={'har ikke nogle avatar elementer.'}
                                          wrapperClass={'reward-avatar-item-wrap'}
                                          rewardsWrapperClass={'reward-avatar-item-wrap__items'}>
                                <AvatarItem wrapper={true}/>
                            </PirateReward>
                        </Tabs.Tab>

                    </div>

                </Tabs.Tabs>
            </Section>
        );
    }
}
/*
*

                        <Tabs.Tab slug='badges' label='Badges'>
                            <Collection resourceName={'rewards.badge'} >
                                <Filters.Static constraint={'user'} value={this.userId}/>
                                <PirateReward name={'badges'}>
                                    <Displays.Text name={'name'} />
                                </PirateReward>
                            </Collection>
                        </Tabs.Tab>

                        <Tabs.Tab slug='titles' label='Titler'>
                            <Collection resourceName={'rewards.user_title'} >
                                <Filters.Static constraint={'user'} value={this.userId}/>
                                <PirateReward name={'titler'}>
                                    <UserTitle selectable={Auth.is(this.userId)} />
                                </PirateReward>
                            </Collection>
                        </Tabs.Tab>

*
* */
