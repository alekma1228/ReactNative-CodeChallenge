import { combineReducers } from 'redux'

import { merchantReducer } from './slices/merchant.slice'

const rootReducer = combineReducers({
  merchant: merchantReducer,
})

export { rootReducer }
