import { authHandlers } from './auth'
import { articleHandlers } from './article'
import { commentHandlers } from './comment'
import { initMockData } from '../db'

initMockData()

export const handlers = [...authHandlers, ...articleHandlers, ...commentHandlers]
