import React from 'react';
import { PersistGate as PersistGateClient } from 'redux-persist/integration/react';
import { useStore } from 'react-redux';

// NOTE: next SSR with fontawesome library
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import {
  isBrowserMode,
} from '../lib';
import { wrapper } from '../store';

import '../styles/globals.css'

const PersistGateServer = ({ children }) => {
  return <>{ children }</>;
}

function RootApp({ Component, pageProps }) {
  const store = useStore();
  /* NOTE: lifecycle: init -> restore
           `PersistGateClient` will not work on server side.
   */
  let PersistGate = PersistGateServer;
  if (isBrowserMode) {
    PersistGate = PersistGateClient
  }
  return (
    <PersistGate persistor={store.__PERSISTOR} loading={null}>
      <Component {...pageProps} />
    </PersistGate>
  );
}

export default wrapper.withRedux(RootApp);
