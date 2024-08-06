import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { payhistoryModel } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PayHistoryService {
  public apiUrl = environment.API_URL;
  userInfor = JSON.parse(localStorage.getItem('user_infor') || '{}');
  constructor(private http: HttpClient) {}
  getPayHistory(body: any): Observable<any> {
    body.accountId = this.userInfor.id;
    return this.http.post(
      this.apiUrl + '/pay-history/search-pay-history-by-post-title',
      body,
    );
  }
  payPost(body: payhistoryModel): Observable<any> {
    return this.http.post(this.apiUrl + `/pay-history/create`, body);
  }

  getLastPayOfPost(id: number): Observable<any> {
    return this.http.get(
      this.apiUrl + `/pay-history/getLastPayOfPost?id=${id}`,
    );
  }
  exportPayHistory(): Observable<any> {
    const body = {
      accountId: JSON.parse(localStorage.getItem('user_infor')!)?.id,
    };
    return this.http
      .post(this.apiUrl + `/pay-history/ExportListPayHistory`, body, {
        responseType: 'blob',
      })
      .pipe(map((response: Blob) => response));
  }
}
