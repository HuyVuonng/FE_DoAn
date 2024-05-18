import { createAction, props } from '@ngrx/store';
import { initialStateInterface } from './ToDo.reducer';

export const DataSoureActionRoute = createAction(
  'routeToLo',
  props<{ data: initialStateInterface }>(),
);

export const LOAD_TODO = 'load todo';
export const LOAD_TODO_SUCCESS = 'load todo success';
export const loadTodos = createAction(LOAD_TODO);
export const loadTodosSuccess = createAction(
  LOAD_TODO_SUCCESS,
  props<{ data: any[] }>(),
);
