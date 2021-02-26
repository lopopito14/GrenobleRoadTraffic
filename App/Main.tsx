import React, { useReducer } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import CamerasList from './views/content/camerasList';
import Context from './store/context';
import reducer from './store/reducer';
import { InitialState } from './store/initialState';
import Navigation from './views/menu/navigation';

const Main = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <View style={styles.fullViewStyle}>
        <StatusBar barStyle="light-content" />
        <Navigation />
        <SafeAreaView style={styles.safeAreaStyle}>
          <CamerasList />
        </SafeAreaView>
      </View>
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  fullViewStyle: {
    backgroundColor: '#ffffff',
  },
  safeAreaStyle: {
    alignItems: 'stretch',
    marginBottom: 100,
  },
});

export default Main;