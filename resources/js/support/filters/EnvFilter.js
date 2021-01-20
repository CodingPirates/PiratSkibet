import React from 'react'
import Filter from '@morningtrain/react-filters/Filter'
import { Env } from '@morningtrain/helpers'

export default class EnvFilter extends Filter {
  constructor (props) {
    super(props)

    if (props.envKey) {
      const value = Env.get(props.envKey)

      if (value) {
        this.constrain(value)
      }
    }
  }

  render () {
    return null
  }
}

export const Injected = EnvFilter.inject()
