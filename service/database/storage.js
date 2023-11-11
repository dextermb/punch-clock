'use client'

const debug = console.debug

export class Storage {
  browser() {
    return typeof window !== 'undefined'
  }

  getItem (key) {
    console.groupCollapsed('storage:get')
    debug(':key %s', key)
    debug(':browser %s', this.browser())

    if (this.browser()) {
      const value = window.localStorage.getItem(key)

      debug(':value %O', value)

      if (value !== null) {
        console.groupEnd()

        return value
      }
    }

    console.groupEnd()

    return null
  }

  setItem(key, value) {
    console.groupCollapsed('storage:set')
    debug(':key %s', key)
    debug(':value %O', value)
    debug(':browser %s', this.browser())
    console.groupEnd()

    if (!this.browser()) {
      return
    }

    window.localStorage.setItem(key, JSON.stringify(value))
  }
}
