import React from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import CameraItem from './cameraItem';
import { ICamera } from '../../store/initialState';
import * as types from '../../store/types';
import { Card } from 'react-native-elements';
import Constants from '../../constants';
import Context from '../../store/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CamerasList = () => {
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const { state, dispatch } = React.useContext(Context);

  React.useEffect(() => {
    loadDatas();
  }, []);

  React.useEffect(() => {
    if (refreshing) {
      loadDatas();
    }
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  const loadDatas = React.useCallback(async () => {

    try {
      dispatch({ type: types.API_REQUEST });

      const response = await fetch(Constants.API);
      const responseJson = await response.json();

      const cameras = responseJson as ICamera[];
      const orderedCameras = cameras.sort((c1: ICamera, c2: ICamera) =>
        c1.name > c2.name ? 1 : c2.name > c1.name ? -1 : 0,
      );

      dispatch({ type: types.API_SUCCESS, payload: orderedCameras });

      orderedCameras.forEach((camera: ICamera) => {
        AsyncStorage.getItem(camera.name).then((key) => {
          if (!key) {
            AsyncStorage.setItem(camera.name, 'true').then(() => {
              dispatch({
                type: 'UPDATE_SHOW_STATUS',
                key: camera.name,
                value: true,
              });
            });
          } else {
            dispatch({
              type: 'UPDATE_SHOW_STATUS',
              key: camera.name,
              value: JSON.parse(key),
            });
          }
        });
      });

    } catch (e) {
      dispatch({ type: types.API_ERROR, payload: e })
    } finally {
      setRefreshing(false);
    }

  }, [dispatch]);

  const formattedDatetime = (time: string) => {
    var date = new Date(Number.parseInt(time, 10) * 1000);
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleTimeString('fr-FR', options);
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[Constants.DARK_CYAN]}
          progressBackgroundColor="#ffffff"
          progressViewOffset={-50}
        />
      }>
      {
        !state.loading && state.data &&
        state.data
          .filter((camera) => camera.show)
          .map((camera, i) => (
            <Card key={i}>
              <Card.Title style={styles.titleStyle}>{camera.name}</Card.Title>
              {/* <Text>{formattedDatetime(camera.time)}</Text> */}
              <Card.Divider />
              <CameraItem url={camera.url} key={i} />
            </Card>
          ))
      }
      {/* {
        state.error && <Text>{state.error}</Text>
      } */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    textTransform: 'uppercase',
    fontSize: 30,
    fontWeight: 'bold',
    color: Constants.DARK_CYAN,
  },
});

export default CamerasList;