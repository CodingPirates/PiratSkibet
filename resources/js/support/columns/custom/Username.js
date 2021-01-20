import React from 'react'
import Column from '@morningtrain/react-columns/base/Column'
import { Username } from 'support/displays'

export default class UsernameColumn extends Column {
  get display () {
    return Username
  }
}

export const Injected = UsernameColumn.inject()
