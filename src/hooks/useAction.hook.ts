import { merchantActions } from '@slices/merchant.slice'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

/*
 * ** Usage **
 * const useAction = makeHook(authActions)
 * const action = useAction('confirmSignUp')
 */
export function makeActionHook<T>(actions: T) {
  return <A extends keyof T>(action: A, isNull = false): T[A] => {
    const dispatch = useDispatch()
    const act = actions[action] as any
    const callback = isNull ? () => dispatch(act()) : (payload: any) => dispatch(act(payload))
    return useCallback(callback, []) as any
  }
}

export const useMerchantAction = makeActionHook(merchantActions)
