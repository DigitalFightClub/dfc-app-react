import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { MoralisProvider } from 'react-moralis';
import { DAppProvider, Mumbai, Polygon, Mainnet } from '@usedapp/core';
import { ENV_CONFG } from './config';
import App from './App';
import { store } from './store';
import { theme } from './styles/theme';
import './index.css';
import '@fontsource/sora/variable.css';
import '@fontsource/sora/400.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const ENV = ENV_CONFG();

// Setup React Query client
const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 30*1000, // may want to increase stale time to prevent refetch longer
    },
  },
});

// Create store for Redux state management
const theStore = store();

const config = {
  readOnlyChainId: ENV.TARGET_NET.chainId,
  readOnlyUrls: {
    [Mumbai.chainId]: `https://polygon-mumbai.infura.io/v3/${ENV.INFURA_KEY}`,
    [Polygon.chainId]: `https://polygon-mainnet.infura.io/v3/${ENV.INFURA_KEY}`,
    [Mainnet.chainId]: `https://mainnet.infura.io/v3/${ENV.INFURA_KEY}`,
  },
  networks: [Mumbai, Polygon, Mainnet],
  notifications: {
    checkInterval: 20000,
    expirationPeriod: 750,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={theStore}>
      {' '}
      <QueryClientProvider client={queryClient}>
        <DAppProvider config={config}>
          <MoralisProvider appId={ENV.MORALIS_APP_ID} serverUrl={ENV.MORALIS_URL} initializeOnMount={true}>
            <ChakraProvider theme={theme}>
              <ColorModeScript initialColorMode={theme.config.initialColorMode} />
              <App />
            </ChakraProvider>
          </MoralisProvider>
        </DAppProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
