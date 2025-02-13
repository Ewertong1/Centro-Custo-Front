import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {
  private apiUrl = 'http://santaizabel.net.br:8080/api/relatorios';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  obterRelatorioSintetico(idCentroCusto: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sintetico/${idCentroCusto}`, { headers: this.getHeaders() });
  }
  
  obterRelatorioAnalitico(idCentroCusto: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/analitico/${idCentroCusto}`, { headers: this.getHeaders() });
  }
  
}
