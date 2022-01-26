import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import monitorReducersEnhancer from './enhancers/monitorReducers';
import loggerMiddleware from './middleware/logger';
import rootReducer from './reducers';

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [loggerMiddleware, ...getDefaultMiddleware()],
    preloadedState,
    enhancers: [monitorReducersEnhancer]
  });

  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    // eslint-disable-next-line no-undef
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}