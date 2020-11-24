interface ServiceInitState {
  status: 'init';
}

interface ServiceLoadingState {
  status: 'loading';
}

interface ServiceLoadedState<T> {
  status: 'loaded';
  payload: T;
}

interface ServiceErrorState {
  status: 'error';
  error: Error;
}

export type ServiceState<T> =
  | ServiceInitState
  | ServiceLoadingState
  | ServiceLoadedState<T>
  | ServiceErrorState;
