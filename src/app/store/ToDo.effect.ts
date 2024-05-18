import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToDOService } from '../core/api/todo.service';
import { loadTodos, loadTodosSuccess } from './ToDo.action';
import { map, mergeMap } from 'rxjs';
import { GetListToduBodyService } from '../core/services/get-list-todu-body.service';

@Injectable()
export class TodoEffect {
  constructor(
    private action$: Actions,
    private TodoService: ToDOService,
    private GetListToduBodyService: GetListToduBodyService,
  ) {}
  body = {
    pageNumber: 1,
    pageSize: 30,
    unitId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    ownerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    assigner: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    assignee: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  };
  loadTodos = createEffect(() => {
    return this.action$.pipe(
      ofType(loadTodos),
      mergeMap(() => {
        return this.TodoService.getListToDo(
          this.GetListToduBodyService.body,
        ).pipe(
          map((data) => {
            return loadTodosSuccess({ data });
          }),
        );
      }),
    );
  });
}
