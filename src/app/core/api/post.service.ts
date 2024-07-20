import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';
import {
  commentModel,
  payhistoryModel,
  postModel,
  postSearchModel,
} from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  isUserLoggedIn!: boolean;
  public apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getListType(): Observable<any> {
    return this.http.post(this.apiUrl + '/HostelType/search', {});
  }
  createPost(body: postModel): Observable<any> {
    return this.http.post(this.apiUrl + '/post/create', body);
  }
  searchPost(body: postSearchModel): Observable<any> {
    return this.http.post(this.apiUrl + '/post/search', body);
  }
  searchPostManager(body: postSearchModel): Observable<any> {
    return this.http.post(this.apiUrl + '/post/searchManager', body);
  }
  searchByID(id: any): Observable<any> {
    return this.http.get(this.apiUrl + `/post/id=${id}`);
  }
  getNewestPost(): Observable<any> {
    return this.http.get(this.apiUrl + `/post/newest`);
  }
  getMostViewPost(): Observable<any> {
    return this.http.get(this.apiUrl + `/post/mostView`);
  }
  deletePost(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + `/post/?id=${id}`);
  }
  updatePost(body: postModel): Observable<any> {
    return this.http.put(this.apiUrl + `/post/update-post`, body);
  }
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
  payPost(body: payhistoryModel): Observable<any> {
    return this.http.post(this.apiUrl + `/pay-history/create`, body);
  }

  getLastPayOfPost(id: number): Observable<any> {
    return this.http.get(
      this.apiUrl + `/pay-history/getLastPayOfPost?id=${id}`,
    );
  }
}
