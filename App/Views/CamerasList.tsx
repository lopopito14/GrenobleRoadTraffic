import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text} from 'react-native';
import {CameraVideo} from './CameraItem';
import CameraService from '../Services/CameraService';
import {Card} from 'react-native-elements';

interface Props {}

export const CameraList: React.FunctionComponent<Props> = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const cameraService = CameraService({refresh: refreshing});

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  function getFormattedDatetime(time: string): string {
    var date = new Date(Number.parseInt(time, 10) * 1000);
    var formattedDate = date.toLocaleString('fr-FR');

    return formattedDate;
  }

  function getInitTemplate() {
    if (cameraService.status === 'init') {
      return <Text>Init...</Text>;
    }
  }

  function getLoadedTemplate() {
    if (cameraService.status === 'loaded') {
      return cameraService.payload.map((camera, i) => (
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
    if (cameraService.status === 'error') {
      return <Text>Error...</Text>;
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
      {getInitTemplate()}
      {getLoadedTemplate()}
      {getErrorTemplate()}
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
    color: '#009688',
  },
});
