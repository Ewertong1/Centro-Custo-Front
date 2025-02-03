import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {
  private apiUrl = 'http://localhost:8080/api/relatorios';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  obterRelatorioSintetico(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sintetico`, { headers: this.getHeaders() });
  }

  obterRelatorioAnalitico(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/analitico`, { headers: this.getHeaders() });
  }
}
