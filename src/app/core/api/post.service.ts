import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';
import { postModel, postSearchModel } from '../models/post';

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
}
