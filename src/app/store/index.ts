import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { ToDOReducer } from './ToDo.reducer';

export interface State {}
export const reducers: ActionReducerMap<State> = {
  toDoReduce: ToDOReducer,
};
export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
