import React from 'react';
import Navigation from "./navigation/navigation";
import {Provider} from "react-redux";
import Store from './store/configure-store';
import { persistStore } from 'redux-persist'
import {PersistGate} from "redux-persist/integration/react";

export default class App extends React.Component {
    render(){
      const persistedStore = persistStore(Store)
      return(
          <Provider store={Store}>
              <PersistGate persistor={persistedStore}>
                  <Navigation />
              </PersistGate>
          </Provider>
      );
    }
}
