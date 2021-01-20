import React from 'react'
import Widget from 'widgets/Widget'
import { Trigger } from '@morningtrain/react-modals'
import { Modal } from 'support/modals'
import { Env, router } from '@morningtrain/helpers'
import { Youtube } from 'widgets/courses/resources/videos/index'
import AspectRatio from 'helpers/AspectRatio'
import VideoBotSVG from './VideoBotSVG'

export default class VideoBot extends Widget {
  get link () {
    return Env.get('content.helper_bot', {})[router.currentRoute]
  }

  get classNames () {
    const { position, alignLeft, alignRight, alignTop, alignBottom } = this.props
    const BASE_CLASS = 'helper-bot'

    return [
      BASE_CLASS,
      position ? `${BASE_CLASS}--${position}` : null,
      alignLeft ? `${BASE_CLASS}--left` : null,
      alignRight ? `${BASE_CLASS}--right` : null,
      alignTop ? `${BASE_CLASS}--top` : null,
      alignBottom ? `${BASE_CLASS}--bottom` : null
    ].filter(e => e).join(' ')
  }

  get styles () {
    return this.props.style ? this.props.style : null
  }

  render () {
    if (!this.link) return null

    return (
      <>
        {console.log(this.styles)}
        <Modal label='Hjælp!' name='helperBot'>
          <div className='helper-bot-video'>
            <AspectRatio>
              <Youtube link={this.link} options={{ autoplay: 1 }} />
            </AspectRatio>
          </div>
        </Modal>
        <Trigger name='helperBot'>
          <div className={this.classNames} style={this.styles}>
            <VideoBotSVG />
          </div>
        </Trigger>
      </>
    )
  }
}
