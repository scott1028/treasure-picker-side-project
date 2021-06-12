import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from 'react-redux';

import { wrapper } from '../store';

import '../styles/globals.css'

function RootApp({ Component, pageProps }) {
  const store = useStore();
  // NOTE: lifecycle: init -> restore
  return (
    <PersistGate persistor={store.__PERSISTOR} loading={<div>Loading</div>}>
      <Component {...pageProps} />
    </PersistGate>
  );
}

export default wrapper.withRedux(RootApp);
