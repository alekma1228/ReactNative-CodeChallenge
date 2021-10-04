import { AppColors } from '@ui/styles/AppStyles'
import { appStyled } from '@ui/styles/AppThemes'
import React from 'react'
import { Merchant } from 'src/model/Merchant'

type MerchantItemProp = {
  merchant: Merchant
  onShare: (merchant: Merchant) => void
}
export const MerchantItem = ({ merchant, onShare }: MerchantItemProp) => {
  return (
    <ItemView>
      <LogoView>
        <LogoImage source={{ uri: merchant.logo_url }} />
      </LogoView>
      <ItemContent>
        <Name>{merchant.name}</Name>
        <InfoText>Cuisines: {merchant.cuisines.join()}</InfoText>
        <InfoText>
          Rating: {merchant.ratings.star_rating}, {merchant.ratings.overall_rating}, {merchant.ratings.num_ratings}
        </InfoText>
        <InfoText>Price Rating: {merchant.price_rating}</InfoText>
        <InfoText>
          {merchant.location.street}, {merchant.location.state}, {merchant.location.zip}
        </InfoText>
        <InfoText>URL: {merchant.url.complete}</InfoText>
        <ShareBtnView onPress={() => onShare(merchant)}>
          <BtnText>Share</BtnText>
        </ShareBtnView>
      </ItemContent>
    </ItemView>
  )
}

const ItemView = appStyled.TouchableOpacity`
  flex-direction: row;
  height: 250px;
  align-items: center;
  padding: 10px;
`
const LogoView = appStyled.View`
  width: 120px;
  height: 120px;
`
const LogoImage = appStyled.Image`
  width: 100%;
  height: 100%;
  resize-mode: contain;
  border-color: ${AppColors.black};
  border-width: 1px;
  border-radius: 5px;
`
const ItemContent = appStyled.View`
  flex: 1;
  margin-left: 10px;
`
const Name = appStyled.Text`
  font-size: 18px;
  color: ${AppColors.black};
  font-weight: 600;
`
const InfoText = appStyled.Text`
  font-size: 14px;
  margin-top: 3px;
  color: ${AppColors.black};
`
const ShareBtnView = appStyled.TouchableOpacity`
  background-color: ${AppColors.darkBlue};
  padding: 5px;
  margin-top: 5px;
  margin-right: 5px;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
  width: 70px;
  align-self: flex-end;
`
const BtnText = appStyled.Text`
  font-size: 14px;
  color: ${AppColors.white}
  text-align: center;
  font-weight: 600;
`
