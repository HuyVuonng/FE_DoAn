import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { searchUser } from '../models/admin';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  isUserLoggedIn!: boolean;
  public apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  setConfigDiscount(body: any): Observable<any> {
    return this.http.post(
      this.apiUrl + '/discount-config/create-discount-config',
      body,
    );
  }
  getDiscountConfig(): Observable<any> {
    return this.http.get(this.apiUrl + '/discount-config/get-all');
  }
}
