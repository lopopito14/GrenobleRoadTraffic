import {useEffect, useState} from 'react';
import Constants from '../Models/Constants';
import {ServiceState} from './ServiceState';
import {Camera} from '../Models/Camera';

export interface Props {
  refresh: boolean;
}

const CameraService = (props: Props) => {
  const [cameraServiceState, setCameraServiceState] = useState<
    ServiceState<Camera[]>
  >({
    status: 'init',
  });

  useEffect(() => {
    if (props.refresh) {
      setCameraServiceState({status: 'loading'});
      fetch(Constants.API)
        .then((response) => response.json())
        .then((response) => {
          const cameras = response
            .map((r: Camera) => r)
            .sort((c1: Camera, c2: Camera) => c1.name > c2.name);

          setCameraServiceState({status: 'loaded', payload: cameras});
        })
        .catch((error) => setCameraServiceState({status: 'error', error}));
    }
  }, [props.refresh]);

  return cameraServiceState;
};

export default CameraService;
