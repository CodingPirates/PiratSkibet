import React from 'react'
import Widget from 'widgets/Widget'
import User from 'widgets/user/User'
import Login from 'widgets/auth/Login'
import Register from 'widgets/auth/Register'
import { Env, router } from '@morningtrain/helpers'
import Notifications from 'widgets/notifications/Notifications'

export default class BackendNavigation extends Widget {
  get title () {
    return (
      <div className='top-navigation__title'>
        {Env.get('page.title')}
      </div>
    )
  }

  get menuItems () {
    return (
      <ul className='top-navigation__items'>
        <li className='top-navigation__item'>
          <Notifications />
        </li>
        <li className='top-navigation__item'>
          <User className='navigation__user' />
        </li>
        <li className='top-navigation__item'>
          <Register className='button button--yellow' />
          <Login className='button button--yellow' />
        </li>
      </ul>
    )
  }

  renderWidget () {
    return (
      <div className='top-navigation'>
        <div className='top-navigation__item-wrap'>
          {this.title}
          {this.menuItems}
        </div>
      </div>
    )
  }
}
