import React from 'react'
import { Collection, Iterator } from '@morningtrain/react-resources'
import WhenCollection from 'support/conditionals/WhenCollection'
import * as Auth from '@morningtrain/react-auth'
import * as Filters from 'support/filters'
import * as Displays from 'support/displays'
import NestedCollection from 'support/resources/NestedCollection'
import NestedModel from 'support/resources/NestedModel'
import RefreshOnLoginReaction from '@morningtrain/react-auth/RefreshOnLoginReaction'

export default class PirateReward extends React.Component {
  static get defaultProps () {
    return {
      emptyText: '',
      resourceName: 'rewards.user_reward',
      operationName: 'opened',
      type: null,
      userId: null
    }
  }

  renderTypeFilter () {
    if (this.props.type === null) {
      return null
    }

    return <Filters.Static constraint='type' value={this.props.type} />
  }

  render () {
    return (
      <Collection resourceName={this.props.resourceName} operationName={this.props.operationName}>
        <Filters.Static constraint='user' value={this.props.userId} />
        {this.renderTypeFilter()}
        <RefreshOnLoginReaction />

        <WhenCollection empty>
          <Auth.Is modelKey='id'>
            <p>Du {this.props.emptyText}</p>
          </Auth.Is>
          <Auth.Is modelKey='id' not>
            <p><Displays.Text name='username' /> {this.props.emptyText}</p>
          </Auth.Is>
        </WhenCollection>

        <WhenCollection empty={false}>
          <Iterator>
            <div className={this.props.wrapperClass}>
              <div>
                <Displays.Heading name='name' level={4} />
                <span className='reward-recieved'>Modtaget: <Displays.DateTime name='created_at' /></span>
                <Displays.Html name='description' />
              </div>
              <NestedCollection name='reward_items'>
                <div className={this.props.rewardsWrapperClass}>
                  <Iterator>
                    <NestedModel name='item'>
                      {this.props.children}
                    </NestedModel>
                  </Iterator>
                </div>
              </NestedCollection>
            </div>
          </Iterator>
        </WhenCollection>

      </Collection>

    )
  }
}
