import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './Components/MainComponent';
import {Provider} from 'react-redux'
import { configureStore} from './Redux/ConfigStore'

export default function App() {

  const store = configureStore()
  return (
    <Provider store={store}>
      <Main />
    </Provider>  
  )
}

