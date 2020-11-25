import {createContext, Dispatch} from 'react';
import {TAction} from './actions';
import {InitialState, TState} from './initialState';

export interface IContextProps {
  state: TState;
  dispatch: Dispatch<TAction>;
}

const Context = createContext<IContextProps>({
  dispatch: () => {},
  state: InitialState,
});

export default Context;
