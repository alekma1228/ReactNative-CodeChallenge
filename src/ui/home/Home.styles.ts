import { AppColors } from '@ui/styles/AppStyles'

import { appStyled } from '../styles/AppThemes'

export const HomeStyles = {
  Container: appStyled.SafeAreaView`
    flex: 1;
  `,
  Contents: appStyled.View`
    flex: 1;
  `,
  Title: appStyled.Text`
    font-size: 28px;
    text-align: center;
    padding-vertical: 7px;
  `,
  SearchView: appStyled.View`
    margin-top: 10px;
    flex-direction: row;
    width: 100%;
    padding-horizontal: 10px;
  `,
  AddressInput: appStyled.TextInput.attrs({ numberOfLines: 1 })`
    border-width: 1px;
    border-color: ${AppColors.black};
    border-radius: 10px;
    padding: 8px 15px;
    font-size: 18px;
    flex: 2;
  `,
  ZipcodeInput: appStyled.TextInput.attrs({ numberOfLines: 1 })`
    margin-left: 10px;
    border-width: 1px;
    border-color: ${AppColors.black};
    border-radius: 10px;
    padding: 8px 15px;
    font-size: 18px;
    flex: 1;
  `,
  SearchBtnView: appStyled.TouchableOpacity`
    background-color: ${AppColors.black};
    padding: 15px;
    margin: 10px;
    border-radius: 12px;
    justify-content: center;
    align-items: center;
  `,
  BtnText: appStyled.Text`
    font-size: 18px;
    color: ${AppColors.white}
    text-align: center;
  `,
  NoDataView: appStyled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
  `,
}
