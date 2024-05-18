import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetListToduBodyService {
  constructor() {}
  body: any;
  setBodyGetListTodo(body: any) {
    this.body = body;
  }
}
