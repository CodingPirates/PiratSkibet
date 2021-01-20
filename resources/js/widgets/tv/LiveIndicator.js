import React from 'react'
import Widget from 'widgets/Widget'
import { Env, router } from '@morningtrain/helpers'
import Badge from 'widgets/forum/Badge'

export default class LiveIndicator extends Widget {
  get isLive () {
    const channels = Env.get('content.twitch.channels', [])

    return channels?.[0]?.is_live
  }

  render () {
    if (!this.isLive) return null

    return (
      <Badge color='red'>
        <img className='blinking-dot' src={router.url('icons/circle.svg')} alt='live indicator' />
        LIVE
      </Badge>
    )
  }
}
