import { merchantEpics } from '@epics/merchant.epic'
import { AnyAction } from 'redux'
import { Epic, combineEpics } from 'redux-observable'

import { AppState } from './AppState'

export const RootEpic = combineEpics(...merchantEpics)

export type TEpic = Epic<AnyAction, AnyAction, AppState>
