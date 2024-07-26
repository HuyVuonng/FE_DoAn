import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HostelTypeService {
  public apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}
  getListType(): Observable<any> {
    return this.http.post(this.apiUrl + '/HostelType/search', {});
  }
}
