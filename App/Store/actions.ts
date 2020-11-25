import {ICamera} from './initialState';
import * as types from './types';

export interface IApiRequest {
  type: types.API_REQUEST;
}

export interface IApiSuccess {
  type: types.API_SUCCESS;
  payload: Array<ICamera>;
}

export interface IApiError {
  type: types.API_ERROR;
  payload: string;
}

export interface IUpdateShowStatus {
  type: types.UPDATE_SHOW_STATUS;
  key: string;
  value: boolean;
}

export const apiRequest = (): IApiRequest => ({
  type: types.API_REQUEST,
});

export const apiSuccess = (payload: Array<ICamera>): IApiSuccess => ({
  type: types.API_SUCCESS,
  payload: payload,
});

export const apiError = (payload: string): IApiError => ({
  type: types.API_ERROR,
  payload: payload,
});

export const updateShowStatus = (
  key: string,
  value: boolean,
): IUpdateShowStatus => ({
  type: types.UPDATE_SHOW_STATUS,
  key: key,
  value: value,
});

export type TAction = IApiRequest | IApiSuccess | IApiError | IUpdateShowStatus;
