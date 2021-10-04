import { MerchantItem } from '@ui/component/MerchantItem.component'
import React from 'react'
import { FlatList } from 'react-native'
import { Merchant } from 'src/model/Merchant'

import { HomeHooks } from './Home.hook'
import { HomeStyles as UI } from './Home.styles'

const { useHome } = HomeHooks

const Home = () => {
  const {
    merchants,
    isRefreshingMerchants,
    refreshMerchants,
    address,
    setAddress,
    zipcode,
    setZipcode,
    onShare,
    onSearch,
  } = useHome()

  return (
    <UI.Container>
      <UI.Contents>
        <UI.Title>Merchants</UI.Title>
        <UI.SearchView>
          <UI.AddressInput placeholder="Street address" value={address} onChangeText={setAddress} />
          <UI.ZipcodeInput placeholder="Zipcode" value={zipcode} onChangeText={setZipcode} />
        </UI.SearchView>
        <UI.SearchBtnView onPress={onSearch}>
          <UI.BtnText>Search</UI.BtnText>
        </UI.SearchBtnView>
        {merchants.length > 0 ? (
          <FlatList<Merchant>
            data={merchants}
            keyExtractor={(item: Merchant, index) => `${index}-${item.id}`}
            renderItem={(item) => <MerchantItem merchant={item.item} onShare={onShare} />}
            onRefresh={refreshMerchants}
            refreshing={isRefreshingMerchants}
          />
        ) : (
          <UI.NoDataView>
            <UI.Title>No Data</UI.Title>
          </UI.NoDataView>
        )}
      </UI.Contents>
    </UI.Container>
  )
}

export default React.memo(Home)
