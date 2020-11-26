export type TState = {
  error: string;
  loading: boolean;
  data: ICamera[];
};

export const InitialState: TState = {
  error: '',
  loading: false,
  data: [],
};

export interface ICamera {
  name: string;
  time: string;
  url: string;
  show: boolean;
}
