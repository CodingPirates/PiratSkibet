import React from 'react'
import Widget from 'widgets/Widget'
import * as Auth from '@morningtrain/react-auth'
import Link from 'widgets/navigation/Link'
import Logo from 'widgets/navigation/Logo'
import { router } from '@morningtrain/helpers'
import MenuItem from 'widgets/navigation/MenuItem'

export default class BackendSideNavigation extends Widget {
  constructor (props) {
    super(props)

    this.toggleSubMenu.bind(this)
  }

  activeLink (linkRoute) {
    for (let i = 0; i < linkRoute.length; i++) {
      const route = linkRoute[i]

      if (route === router.currentRoute) {
        return ' side-navigation__item--active'
      }
    }

    return ''
  }

  toggleSubMenu (e) {
    const navItem = e.target.parentNode
    const subItemsHeight = navItem.querySelector('.side-navigation__sub-items').offsetHeight
    const navSubWrap = navItem.querySelector('.side-navigation__sub-wrap')
    const navToggle = navItem.querySelector('.side-navigation__toggle')

    navSubWrap.classList.toggle('side-navigation__sub-wrap--open')
    navToggle.classList.toggle('side-navigation__toggle--open')

    if (navSubWrap.classList.contains('side-navigation__sub-wrap--open')) {
      navSubWrap.style.maxHeight = subItemsHeight + 'px'
    } else {
      navSubWrap.style.maxHeight = '0px'
    }
  }

  get logo () {
    return (
      <div className='side-navigation__logo-wrap'>
        <Link route='backend.home.react' className='side-navigation__logo'>
          <Logo />
        </Link>
      </div>
    )
  }

  get menuItems () {
    return (
      <div className='side-navigation__item-wrap'>
        <ul className='side-navigation__items'>

          <MenuItem label='Brugere'>
            <MenuItem route='backend.users.pirates.index' />
            <MenuItem route='backend.users.backend.index' />
            <MenuItem route='backend.contact.index' />
          </MenuItem>

          <MenuItem label='Moderation'>
            <MenuItem route='backend.moderation.index_cases' label='Sager' />
            <MenuItem route='backend.moderation.index_suspensions' label='Suspenderinger' />
          </MenuItem>

          <MenuItem label='Indhold'>
            <MenuItem route='backend.content.news.index' />
            <MenuItem route='backend.content.events.index' />
            <MenuItem route='backend.content.twitch_channels.index' />
            <MenuItem route='backend.content.livestreams.index' />
            <MenuItem route='backend.content.videos.index' />
            <MenuItem route='backend.content.meetings.index' />
            <MenuItem route='backend.content.posts.index' />
          </MenuItem>

          <MenuItem label='Læringsforløb'>
            <MenuItem route='backend.courses.index_categories' />
            <MenuItem route='backend.courses.index_courses' />
          </MenuItem>

          <MenuItem label='Forum'>
            <MenuItem route='backend.forum.index_topics' />
          </MenuItem>

          <MenuItem label='Showcase'>
            <MenuItem route='backend.projects.index_categories' />
          </MenuItem>

          <MenuItem label='Gamification'>
            <MenuItem route='backend.gamification.achievements.index' />
            <MenuItem route='backend.gamification.avatar_items.index' />
            <MenuItem route='backend.gamification.badges.index' />
            <MenuItem route='backend.gamification.user_titles.index' />
            <MenuItem route='backend.gamification.users.index' />
          </MenuItem>

        </ul>
      </div>
    )
  }

  renderWidget () {
    return (
      <div className='side-navigation'>
        {this.logo}
        {this.menuItems}
      </div>
    )
  }
}
