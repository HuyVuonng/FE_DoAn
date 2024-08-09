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

  pay(price: any = 50000): Observable<any> {
    return this.http.post(this.apiUrl + '/create_payment_url', {
      amount: price,
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

  sendMailForgotPass(body: any): Observable<any> {
    return this.http.post(this.apiUrl + '/sendMailForgotPass', body);
  }

  sendMailReport(body: any): Observable<any> {
    console.log(body);

    return this.http.post(this.apiUrl + '/sendMailReport', body);
  }
}
