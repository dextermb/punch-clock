'use client'

import { useEffect, useState } from "react";

import { init, database } from "~/service/database.js";

export function useDatabase () {
  const [value, setValue] = useState(init.history)

  const hydrate = () => {
    database.read()
    setValue(database.data.history)
  }

  const set = (id, value) => {
    database.data.history.unshift({ id, value })
    database.write()

    hydrate()
  }

  const remove = (id) => {
    const index = database.data.history.find(entry => entry.id === id)

    if (index < 0) {
      return
    }

    database.data.history.splice(index, 1)
    database.write()

    hydrate()
  }

  useEffect(() => {
    hydrate()
  }, [])

  return [value, { hydrate, set, remove }]
}
