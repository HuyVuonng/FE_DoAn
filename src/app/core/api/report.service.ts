import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  public apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}
  getReportByID(id: number): Observable<any> {
    return this.http.get(this.apiUrl + `/report/get-by-id=${id}`);
  }

  createReport(body: any): Observable<any> {
    return this.http.post(this.apiUrl + `/report/create`, body);
  }

  searchReport(body: any): Observable<any> {
    return this.http.post(this.apiUrl + `/report/search`, body);
  }

  updateReport(body: any): Observable<any> {
    return this.http.put(this.apiUrl + `/report/update`, body);
  }
  deleteReport(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + `/report?id=${id}`);
  }
}
