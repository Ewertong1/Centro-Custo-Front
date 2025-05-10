import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Torna o serviço acessível globalmente
})
export class AgenteService {
  private apiUrl = 'https://santaizabel.net.br/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtendo o token armazenado
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  listarAgentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/agentes`, { headers: this.getHeaders() });
  }

  buscarAgentePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/agentes/${id}`, { headers: this.getHeaders() });
  }

  criarAgente(agente: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/agentes`, agente, { headers: this.getHeaders() });
  }

  atualizarAgente(id: number, agenteAtualizado: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/agentes/${id}`, agenteAtualizado, { headers: this.getHeaders() });
  }
}
