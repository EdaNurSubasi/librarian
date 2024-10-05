import {configureStore} from '@reduxjs/toolkit'
import reducer from './reducer'
import request from "./middlewares/request"
import error from "./middlewares/error"


const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      //ignoredActions: ['rtc/call/incoming']
    }
  }).concat([request, error])
});

export default store