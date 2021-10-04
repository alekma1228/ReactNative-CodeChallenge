import { AnyAction } from 'redux'
import { concatAll, filter, switchMap } from 'rxjs/operators'

import { fetchMerchants } from '../../api/api'
import { TEpic } from '../RootEpic'
import { merchantActions } from '../slices/merchant.slice'

const e: TEpic[] = []

e[e.length] = (action$, _state$, {}) =>
  action$.pipe(
    filter(merchantActions.get_merchants.match),
    switchMap(
      async ({ payload }): Promise<AnyAction[]> => {
        const res = await fetchMerchants(payload.address, payload.zipcode)
        if (res.isSuccess) {
          return [merchantActions.set_merchants({ merchants: res.result.merchants })]
        } else {
          return [merchantActions.set_merchants({ merchants: [] })]
        }
      },
    ),
    concatAll(),
  )

export const merchantEpics = e
