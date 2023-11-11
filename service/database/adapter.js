'use client'

import { Storage } from './storage.js'

const debug = console.debug

export class Adapter {
  constructor(key) {
    this.key = key
    this.storage = new Storage()

    debug('adapter:key %s', key)
  }

  read() {
    const value = this.storage.getItem(this.key)

    console.groupCollapsed('adapter:read')
    debug(':value %O', value)
    console.groupEnd()

    if (value !== null) {
      return JSON.parse(value)
    }

    return null
  }

  write(value) {
    console.groupCollapsed('adapter:write')
    debug(':key %O', this.key)
    debug(':value %O', value)
    console.groupEnd()

    this.storage.setItem(this.key, value)
  }
}
