import { Injectable } from '@angular/core';
import { commentModel } from '../models/post';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  public apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}
  createComment(body: commentModel): Observable<any> {
    return this.http.post(this.apiUrl + `/comment/create`, body);
  }
  getComment(id: number): Observable<any> {
    return this.http.post(this.apiUrl + `/comment/search`, {
      postId: id,
      pageNumber: 1,
      pageSize: 100,
    });
  }
  deleteComment(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/comment?id=${id}`);
  }
}
