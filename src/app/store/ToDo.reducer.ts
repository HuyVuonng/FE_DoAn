import { createReducer, on } from '@ngrx/store';
import { DataSoureActionRoute, loadTodosSuccess } from './ToDo.action';

export interface initialStateInterface {
  data: any;
}

export const initialState: initialStateInterface = {
  data: null,
};

export const ToDOReducer = createReducer(
  initialState,
  on(loadTodosSuccess, (state, { data }) => {
    return {
      ...state,
      ...data,
    };
  }),
);
