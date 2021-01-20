import React from 'react'
import { Env } from '@morningtrain/helpers'
import { toast } from 'react-toastify'

export default class FlashFromSession extends React.Component {
  componentDidMount () {
    this.flashSession()
  }

  pullFlash () {
    const res = Env.get('page.flash_messages', [])

    Env.set('page.flash_messages', [])

    return res
  }

  flashSession () {
    this.pullFlash().forEach(msg => {
      return msg.type === 'error'
        ? toast.error(msg.message)
        : toast.success(msg.message)
    })
  }

  render () {
    return (
      <>
        {this.props.children}
      </>
    )
  }
}
