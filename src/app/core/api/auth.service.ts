import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../services/storage.service';
import { logInModel, signInModel } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn!: boolean;
  public apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService,
  ) {}

  logout(): void {
    this.storageService.clearStorage();
    window.location.reload();
    this.router.navigate(['/']);
  }
  signIn(body: signInModel): Observable<any> {
    return this.http.post(this.apiUrl + '/user/create-user', body);
  }
  login(body: logInModel): Observable<any> {
    return this.http.post(this.apiUrl + '/user/login', body);
  }
  activeAccount(body: any): Observable<any> {
    return this.http.post(this.apiUrl + '/user/active', body);
  }
}
