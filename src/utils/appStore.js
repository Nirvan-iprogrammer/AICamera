import { configureStore } from '@reduxjs/toolkit'
import serviceReducer from './userSlice'

const appStore = configureStore({
  reducer: {
    service: serviceReducer
  },
})

export default appStore