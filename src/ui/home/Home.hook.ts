import { useMerchantAction } from '@hooks/useAction.hook'
import { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import Share from 'react-native-share'
import { Merchant } from 'src/model/Merchant'

import { useASelector } from '../../utilities/recipies.util'

const ZIP_REG = /(^\d{5}$)|(^\d{5}-\d{4}$)/
const ADDRESS_REG = /\d+\s[\w\s]*$/

const useHome = () => {
  const { merchants, isRefreshingMerchants, searchAddress, searchZipcode } = useASelector((state) => state.merchant)
  const getMerchants = useMerchantAction('get_merchants')
  const [address, setAddress] = useState<string>(searchAddress)
  const [zipcode, setZipcode] = useState<string>(searchZipcode)

  const refreshMerchants = useCallback(() => {
    if (address.length === 0) {
      showErrAlert('Please input street address.')
      return
    }
    const addressValidation = ADDRESS_REG.test(address)
    if (!addressValidation) {
      showErrAlert('Please input correct street address.')
      return
    }
    if (zipcode.length === 0) {
      showErrAlert('Please input zipcode.')
      return
    }
    const zipcodeValidation = ZIP_REG.test(zipcode)
    if (!zipcodeValidation) {
      showErrAlert('Please input correct zipcode.')
      return
    }

    if (address.length > 0 && zipcode.length > 0) {
      getMerchants({ address, zipcode })
    }
  }, [address, zipcode])

  const showErrAlert = (message: string) => {
    Alert.alert(
      '',
      message,
      [
        {
          text: 'Yes',
          onPress: () => console.log(''),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    )
  }

  const onSearch = () => {
    refreshMerchants()
  }

  const onShare = (merchant: Merchant) => {
    const message = 'I am sharing restaurant link.' + '\n' + '\n' + 'Please check.' + '\n' + '\n'
    Share.open({
      url: merchant.url.complete,
      message,
      title: 'Share restaurant',
    })
      .then((res) => console.log('share restaurant success', res))
      .catch((err) => console.log('share restaurant error', err))
  }

  return {
    merchants,
    isRefreshingMerchants,
    refreshMerchants,
    address,
    setAddress,
    zipcode,
    setZipcode,
    onShare,
    onSearch,
  }
}

export const HomeHooks = { useHome }
