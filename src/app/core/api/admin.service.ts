import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  isUserLoggedIn!: boolean;
  public apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getListUser(): Observable<any> {
    return this.http.get(this.apiUrl + '/user/get-users');
  }
}
