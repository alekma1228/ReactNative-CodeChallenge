import { useCallback } from 'react'
import { Selector, useSelector } from 'react-redux'

import { AppState } from '../redux/AppState'

/**
 * to use when returning a primitive value from
 * the selector
 * @prop props required when selector has value in closure,
 * else it wont re-render when said value changes
 * eg: state => state.server[serverKey].status; serverKey is the prop
 */
export const useASelector = <TSelected, TState = AppState>(selector: Selector<TState, TSelected>, props?: any) =>
  useSelector<TState, TSelected>(useCallback(selector, [props]))
