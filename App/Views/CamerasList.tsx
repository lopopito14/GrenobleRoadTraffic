import React from 'react';
import {ActivityIndicator, ScrollView, Text} from 'react-native';
import {CameraVideo} from './CameraItem';
import CameraService from '../Services/CameraService';
import {Card} from 'react-native-elements';

interface Props {
  refresh: boolean;
}

export const CameraList: React.FunctionComponent<Props> = (props: Props) => {
  const cameraService = CameraService({refresh: props.refresh});

  function getFormattedTitle(title: string) {
    return title.toUpperCase();
  }

  function getFormattedDatetime(time: string): string {
    var date = new Date(Number.parseInt(time, 10) * 1000);
    var formattedDate = date.toUTCString();

    return formattedDate;
  }

  if (cameraService.status === 'init') {
    return <Text>Init...</Text>;
  }

  if (cameraService.status === 'loading') {
    return <ActivityIndicator size="large" color="#009688" />;
  }

  if (cameraService.status === 'loaded') {
    if (cameraService.payload === null) {
      return <Text>No Cameras</Text>;
    }

    const cameraItems = cameraService.payload.map((camera, i) => (
      <Card key={i}>
        <Card.Title>{getFormattedTitle(camera.name)}</Card.Title>
        <Text>{getFormattedDatetime(camera.time)}</Text>
        <Card.Divider />
        <CameraVideo url={camera.url} key={i} />
      </Card>
    ));

    return <ScrollView>{cameraItems}</ScrollView>;
  }

  if (cameraService.status === 'error') {
    return <Text>Error...</Text>;
  }

  return <></>;
};
