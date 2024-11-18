import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getData(): Observable<{ message: string}> {
    return this.http.get<{message: string}>(`${this.baseUrl}/api/data`);
  }
}
