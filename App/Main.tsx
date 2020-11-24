import React from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';
import {CameraList} from './Views/CamerasList';

const Main = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <Text>Hello from main page !</Text>
        <CameraList />
      </SafeAreaView>
    </>
  );
};

export default Main;
