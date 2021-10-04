import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Merchant } from 'src/model/Merchant'

type State = {
  merchants: Merchant[]
  isRefreshingMerchants: boolean
  searchAddress: string
  searchZipcode: string
}

const INITIAL_STATE: State = {
  merchants: [],
  isRefreshingMerchants: false,
  searchAddress: '',
  searchZipcode: '',
}

const merchantSlice = createSlice({
  name: '@merchant',
  initialState: INITIAL_STATE,
  reducers: {
    get_merchants: (state, { payload }: PayloadAction<{ address: string; zipcode: string }>) => {
      state.isRefreshingMerchants = true
      state.searchAddress = payload.address
      state.searchZipcode = payload.zipcode
    },
    set_merchants: (state, { payload }: PayloadAction<{ merchants: Merchant[] }>) => {
      state.merchants = payload.merchants
      state.isRefreshingMerchants = false
    },
  },
})

export const merchantActions = merchantSlice.actions
export const merchantReducer = merchantSlice.reducer
