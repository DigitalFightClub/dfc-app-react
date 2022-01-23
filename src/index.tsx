import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { DAppProvider } from '@usedapp/core'
import ENV_CONFG from './config'
import App from './App';
import { store } from './store';
import { theme } from './styles/theme';
import './index.css';
import '@fontsource/sora/variable.css';
import '@fontsource/sora/400.css';

const ENV = ENV_CONFG()

const config = {
  readOnlyChainId: ENV.TARGET_NET,
  readOnlyUrls: {
    [ENV.TARGET_NET]: `https://polygon-${ENV.NET_NAME}.infura.io/v3/454b1c54f86d4974b60feec0c680c133`,
  },
  supportedChains: [
    ENV.TARGET_NET
  ],
  notifications: {
    checkInterval: 3000,
    expirationPeriod: 750
  },
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </Provider>
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
