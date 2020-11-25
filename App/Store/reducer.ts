import {ICamera} from './initialState';
import * as types from './types';
import {TState} from './initialState';
import {TAction} from './actions';

function reducer(state: TState, action: TAction): TState {
  switch (action.type) {
    case types.API_REQUEST:
      return {...state, loading: true};
    case types.API_SUCCESS:
      if (action.payload) {
        const apiCameras = action.payload as Array<ICamera>;

        if (apiCameras) {
          let newCameras: ICamera[] = [];

          apiCameras.forEach((apiCamera: ICamera) => {
            const existingCamera = state.data.find(
              (camera: ICamera) => camera.name === apiCamera.name,
            );

            if (existingCamera) {
              existingCamera.time = apiCamera.time;
              newCameras.push(existingCamera);
            } else {
              newCameras.push(apiCamera);
            }
          });

          return {...state, loading: false, data: newCameras};
        }
      }

      return {...state, loading: false, data: action.payload};
    case types.API_ERROR:
      return {...state, loading: false, error: action.payload};
    case types.UPDATE_SHOW_STATUS:
      return {
        ...state,
        data: state.data.map((camera: ICamera) => {
          return camera.name === action.key
            ? {...camera, show: action.value}
            : camera;
        }),
      };
    default:
      return state;
  }
}

export default reducer;
