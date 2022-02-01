import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom';
// import configureStore from './configureStore';
import { Provider } from 'react-redux';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { MoralisProvider } from 'react-moralis';
import { DAppProvider } from '@usedapp/core';
import ENV_CONFG from './config';
import App from './App';
import { store } from './store';
import { theme } from './styles/theme';
import './index.css';
import '@fontsource/sora/variable.css';
import '@fontsource/sora/400.css';

const ENV = ENV_CONFG();
// const store = configureStore();

const config = {
  readOnlyChainId: ENV.TARGET_NET.chainId,
  readOnlyUrls: {
    [ENV.TARGET_NET.chainId]: `https://polygon-${ENV.TARGET_NET.chainName}.infura.io/v3/${ENV.INFURA_KEY}`,
  },
  networks: [
    ENV.TARGET_NET
  ],
  notifications: {
    checkInterval: 3000,
    expirationPeriod: 750
  },
};

// const renderApp = () => {
//   render(
//     <DAppProvider config={config}>
//       <Provider store={store}>
//         <ChakraProvider theme={theme}>
//           <ColorModeScript initialColorMode={theme.config.initialColorMode} />
//           <App />
//         </ChakraProvider>
//       </Provider>
//     </DAppProvider>
//   );

//   // if (process.env.NODE_ENV !== 'production' && module.hot) {
//   //   module.hot.accept('./components', renderApp);
//   // }
// };
// renderApp();

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <MoralisProvider appId={ENV.MORALIS_APP_ID} serverUrl={ENV.MORALIS_URL} initializeOnMount={true}>
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
          </ChakraProvider>
        </Provider>
      </MoralisProvider>
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
