'use client'

import { LowSync } from 'lowdb'
import { Adapter } from './database/adapter.js'

export const init = { history: [] }

export const database = new LowSync(new Adapter('db'), init)
