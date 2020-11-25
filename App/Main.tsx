import React, {useReducer} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {CameraList} from './Views/content/camerasList';
import Context from './store/context';
import reducer from './store/reducer';
import {InitialState} from './store/initialState';
import Navigation from './Views/menu/navigation';

interface Props {}

export const Main: React.FunctionComponent<Props> = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  return (
    <Context.Provider value={{state, dispatch}}>
      <>
        <StatusBar barStyle="light-content" />
        <Navigation />
        <SafeAreaView style={styles.safeAreaStyle}>
          <CameraList />
        </SafeAreaView>
      </>
    </Context.Provider>
  );
};

export default Main;

const styles = StyleSheet.create({
  safeAreaStyle: {
    alignItems: 'stretch',
    marginBottom: 100,
  },
});
