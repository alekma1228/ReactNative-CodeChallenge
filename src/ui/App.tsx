/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import Home from '@ui/home/Home.screen'
import React, { useEffect, useState } from 'react'
import { LogBox, StatusBar, Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { AnyAction, Store } from 'redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AppServices } from 'src/redux/AppServices'
import { ThemeProvider } from 'styled-components'

import { AppState } from '../redux/AppState'
import { Persistor, createStoreWithMiddleware } from '../redux/CreateStore'
import { RootEpic } from '../redux/RootEpic'
import { rootReducer } from '../redux/RootReducer'
import { MainTheme } from './styles/AppThemes'

LogBox.ignoreLogs(['Cannot update a component from inside the function body'])

const App: React.FC = () => {
  const [store, setStore] = useState<Store | undefined>(undefined)
  const [persistor, setPersistor] = useState<Persistor | undefined>(undefined)

  useEffect(() => {
    const { store, persistor } = createStoreWithMiddleware<AppState, AnyAction, AppServices>({}, RootEpic, rootReducer)
    setStore(store)
    setPersistor(persistor)
  }, [])

  return (
    <ThemeProvider theme={MainTheme}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaProvider>
        {store === undefined || persistor === undefined ? (
          <>
            <Text>Loading</Text>
          </>
        ) : (
          <Provider store={store}>
            <PersistGate loading={<Text>Loading</Text>} persistor={persistor}>
              <Home />
            </PersistGate>
          </Provider>
        )}
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default App
