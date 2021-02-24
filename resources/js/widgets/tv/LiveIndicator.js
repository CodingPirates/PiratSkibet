import React from 'react'
import Widget from 'widgets/Widget'
import { Env, router } from '@morningtrain/helpers'
import Badge from 'widgets/forum/Badge'

export default class LiveIndicator extends Widget {
  get isLive () {
    const twitch      = Env.get('content.twitch.channels', [])
    const livestreams = Env.get('content.livestreams', [])

    return twitch?.[0]?.is_live || livestreams?.[0]?.is_live
  }

  render () {
    if (!this.isLive) return null

    return (
      <Badge color='red'>
        <img className='blinking-dot' src={router.url('icons/circle.svg')}
             alt='live indicator'/>
        LIVE
      </Badge>
    )
  }
}
