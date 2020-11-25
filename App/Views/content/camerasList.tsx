import React, {useEffect, useContext} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text} from 'react-native';
import {CameraVideo} from './cameraItem';
import {ICamera} from '../../Store/initialState';
import * as types from '../../Store/types';
import {Card} from 'react-native-elements';
import Constants from '../../constants';
import Context from '../../Store/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {}

export const CameraList: React.FunctionComponent<Props> = () => {
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const {state, dispatch} = useContext(Context);

  const loadDatas = React.useCallback(() => {
    dispatch({type: types.API_REQUEST});

    fetch(Constants.API)
      .then((response) => response.json())
      .then((response) => {
        const cameras = response as ICamera[];
        const orderedCameras = cameras.sort((c1: ICamera, c2: ICamera) =>
          c1.name > c2.name ? 1 : c2.name > c1.name ? -1 : 0,
        );

        dispatch({type: types.API_SUCCESS, payload: orderedCameras});

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
              AsyncStorage.getItem(camera.name).then((value) => {
                dispatch({
                  type: 'UPDATE_SHOW_STATUS',
                  key: camera.name,
                  value: value === 'true' ? true : false,
                });
              });
            }
          });
        });

        setRefreshing(false);
      })
      .catch((error) => dispatch({type: types.API_ERROR, payload: error}));
  }, [dispatch]);

  useEffect(() => {
    if (refreshing) {
      loadDatas();
    }
  }, [refreshing, loadDatas]);

  useEffect(() => {
    loadDatas();
  }, [loadDatas]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  function getFormattedDatetime(time: string): string {
    var date = new Date(Number.parseInt(time, 10) * 1000);
    var formattedDate = date.toLocaleString('fr-FR');

    return formattedDate;
  }

  function getLoadingTemplate() {
    if (state.loading) {
      return <></>;
    }
  }

  function getLoadedTemplate() {
    if (state.data) {
      return state.data
        .filter((camera) => camera.show)
        .map((camera, i) => (
          <Card key={i}>
            <Card.Title style={styles.titleStyle}>{camera.name}</Card.Title>
            <Text>{getFormattedDatetime(camera.time)}</Text>
            <Card.Divider />
            <CameraVideo url={camera.url} key={i} />
          </Card>
        ));
    }
  }

  function getErrorTemplate() {
    if (state.error) {
      return <Text>{state.error}</Text>;
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#009688']}
          progressBackgroundColor="#ffffff"
          progressViewOffset={-50}
        />
      }>
      {getLoadingTemplate()}
      {getLoadedTemplate()}
      {getErrorTemplate()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    textTransform: 'uppercase',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#009688',
  },
});
