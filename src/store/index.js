import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import campaignReducer from './campaignSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['campaign'] // Only persist campaign state
}

const persistedReducer = persistReducer(persistConfig, campaignReducer)

export const store = configureStore({
  reducer: {
    campaign: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)
