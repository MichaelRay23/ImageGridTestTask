import React from 'react';

import {store, persister} from '../redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ImageComponent from './ImageComponent';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <ImageComponent />
      </PersistGate>
    </Provider>
  );
};

export default App;
