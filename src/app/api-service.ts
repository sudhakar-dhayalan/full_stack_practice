import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFile } from './file-upload/file.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/uploads`, formData);
  }

  getUploadedFiles<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(endpoint);
    // return this.http.get<T>(`${this.baseUrl}/uploads`);
  }
}
