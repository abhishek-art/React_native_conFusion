import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './Components/MainComponent';
import {Provider} from 'react-redux'
import { configureStore} from './Redux/ConfigStore'
import {PersistGate} from 'redux-persist/es/integration/react'
import {Loading} from './Components/LoadingComponent'


export default function App() {

  const {persistor , store} = configureStore()
  return (
    <Provider store={store}>
      <PersistGate Loading={<Loading />} persistor={persistor}>
      <Main />
      </PersistGate>
    </Provider>  
  )
}

