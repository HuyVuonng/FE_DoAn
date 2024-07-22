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
export class UserService {
  isUserLoggedIn!: boolean;
  public apiUrl = environment.API_URL;
  userInfor = JSON.parse(localStorage.getItem('user_infor') || '{}');
  constructor(private http: HttpClient) {}

  addFavorite(postId: any): Observable<any> {
    const body = {
      postId,
      accountId: this.userInfor.id,
    };
    return this.http.post(this.apiUrl + '/favorite/create', body);
  }
  updateFavorite(postId: any, deleteFlag: boolean): Observable<any> {
    const body = {
      postId,
      accountId: this.userInfor.id,
      deleteFlag: deleteFlag,
    };
    return this.http.put(this.apiUrl + '/favorite/update', body);
  }

  getFavoriteByID(pageNumber: number, pageSize: number): Observable<any> {
    const body = {
      accountId: this.userInfor.id,
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    return this.http.post(this.apiUrl + '/favorite/search', body);
  }
  getFavoriteByIDPostAndUserID(postId: Number): Observable<any> {
    const body = {
      accountId: this.userInfor.id,
      postId: Number(postId),
    };
    return this.http.post(this.apiUrl + '/favorite/search', body);
  }
  getPayHistory(body: any): Observable<any> {
    body.accountId = this.userInfor.id;
    return this.http.post(this.apiUrl + '/pay-history/search', body);
  }
  getPayHistory2(body: any): Observable<any> {
    body.accountId = this.userInfor.id;
    return this.http.post(
      this.apiUrl + '/pay-history/search-pay-history-by-post-title',
      body,
    );
  }
}
