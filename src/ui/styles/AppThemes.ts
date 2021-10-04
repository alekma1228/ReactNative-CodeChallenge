import styled, { ReactNativeStyledInterface } from 'styled-components/native'

import { AppColors, AppFonts } from './AppStyles'

// keyof typeof Backgrounds
export interface AppTheme {
  fonts: typeof AppFonts
  colors: typeof AppColors
}

export const appStyled: ReactNativeStyledInterface<AppTheme> = styled

// ands this 'Types' it
declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}

export const MainTheme: AppTheme = {
  fonts: AppFonts,
  colors: AppColors,
}
