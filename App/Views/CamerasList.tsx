import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import Constants from '../Models/Constants';
import {CameraItem} from './CameraItem';

interface Props {}

export interface Camera {
  name: string;
  time: string;
  url: string;
}

interface CamerasState {
  Cameras: Camera[];
  IsLoading: boolean;
}

export const CameraList: React.FunctionComponent<Props> = () => {
  const [camerasState, setCamerasState] = useState<CamerasState>({
    Cameras: [],
    IsLoading: true,
  });

  useEffect(() => {
    //setCamerasState({...camerasState, IsLoading: true});

    fetch(Constants.API)
      .then((response) => {
        console.log(response.text);
        return response.json();
      })
      .then((json) => setCamerasState({...camerasState, Cameras: json}))
      .catch((error) => console.error(error))
      .finally(() => setCamerasState({...camerasState, IsLoading: false}));
  });

  function IsLoadingTemplate(): JSX.Element {
    return <Text>Loading...</Text>;
  }

  function DisplayCameras(cameras: Camera[]): JSX.Element {
    if (cameras === null) {
      return <Text>error</Text>;
    }

    const cameraItems = cameras.map((camera) => (
      <CameraItem Camera={camera} key={camera.name} />
    ));

    return (
      <ScrollView>
        <Text>Hello from scroll viewer !</Text>
        {cameraItems}
      </ScrollView>
    );
  }

  if (camerasState.IsLoading) {
    return IsLoadingTemplate();
  }

  return DisplayCameras(camerasState.Cameras);
};
