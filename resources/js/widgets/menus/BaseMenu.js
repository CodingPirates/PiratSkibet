import React from 'react'
import { Menu, Item, Separator, Submenu, MenuProvider } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import shortid from 'shortid'
import * as Auth from '@morningtrain/react-auth'

export default class BaseMenu extends React.Component {
  constructor (props) {
    super(props)

    this.uuid = shortid.generate()
  }

  get menuId () {
    return 'base_menu'
  }

  get items () {
    return [].filter(item => item)
  }

  renderMenuItems () {
    const items = this.items

    if (items.length === 0) {
      return null
    }

    return items.map((item, index) => {
      return React.cloneElement(item, { key: index })
    })
  }

  renderMenu (items) {
    return (
      <Menu id={this.menuId}>
        {items}
      </Menu>
    )
  }

  renderMenuIcon () {
    return (
      <svg viewBox='0 0 24 6' width={24} className='context-menu-icon'>
        <rect width={6} height={6} fill='#333333' x={0} y={0} />
        <rect width={6} height={6} fill='#333333' x={9} y={0} />
        <rect width={6} height={6} fill='#333333' x={18} y={0} />
      </svg>
    )
  }

  renderMenuContent () {
    const items = this.renderMenuItems()

    if (items === null) {
      return null
    }

    return (
      <>
        <MenuProvider id={this.menuId} event='onClick' className='context-menu'>
          {this.renderMenuIcon()}
        </MenuProvider>
        {this.renderMenu(items)}
      </>
    )
  }

  render () {
    return (
      <Auth.Check>
        {this.renderMenuContent()}
      </Auth.Check>
    )
  }
}
