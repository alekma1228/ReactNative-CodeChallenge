import AsyncStorage from '@react-native-community/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import { Action, Reducer, Store } from 'redux'
import { Epic, createEpicMiddleware } from 'redux-observable'
import { persistReducer, persistStore } from 'redux-persist'

export type Persistor = ReturnType<typeof persistStore>

function createStoreWithMiddleware<AppState, AnyAction extends Action, AppServices>(
  dependencies: AppServices,
  rootEpic: Epic<AnyAction, AnyAction, AppState>,
  rootReducer: Reducer<AppState>,
): { store: Store<AppState, AnyAction>; persistor: Persistor } {
  const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, AppState, AppServices>({
    dependencies: dependencies,
  })
  const persistConfig = {
    key: 'root',
    blacklist: [],
    storage: AsyncStorage,
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = configureStore({
    reducer: persistedReducer,
    enhancers: [],
    middleware: [epicMiddleware],
  })
  const persistor = persistStore(store)

  epicMiddleware.run(rootEpic)

  return { store: store as any, persistor }
}

export { createStoreWithMiddleware }
