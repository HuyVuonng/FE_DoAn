import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class PayAndSendMailService {
  isUserLoggedIn!: boolean;
  public apiUrl = environment.URL_Render;

  constructor(private http: HttpClient) {}

  pay(): Observable<any> {
    return this.http.post(this.apiUrl + '/create_payment_url', {
      amount: 50000,
      orderDescription: 'Thanh toan phi dang bai ',
      orderType: 'other',
      redirect: `${window.location.protocol}//${window.location.host}/paymentStatus`,
    });
  }
  checkStatusPay(): Observable<any> {
    return this.http.get(this.apiUrl + `/vnpay_ipn${window.location.search}`);
  }

  sendMail(body: any): Observable<any> {
    return this.http.post(this.apiUrl + '/sendMail', body);
  }

  sendMailActiveAccount(body: any): Observable<any> {
    return this.http.post(this.apiUrl + '/sendMailActiveAccount', body);
  }
}
