import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CentroCusto } from '../centro-custo/cadastro-centro-custo/cadastro-centro-custo.component';

@Injectable({
  providedIn: 'root'
})
export class CentroCustoService {
  private apiUrl = 'http://santaizabel.net.br:8080/api/centro-custo'; // Ajuste conforme necessário

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');  // Obtendo o token armazenado
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  // Método para salvar um centro de custo
  salvarCentroCusto(centroCusto: CentroCusto): Observable<CentroCusto> {
    return this.http.post<CentroCusto>(this.apiUrl, centroCusto, {
      headers: this.getHeaders()
    });
  }

  listarTodos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`, { headers: this.getHeaders() });
  }
  
  filtrarCentroCusto(filtros: any): Observable<any[]> {
    const params = new URLSearchParams();
    if (filtros.nome) params.append('nome', filtros.nome);
    if (filtros.localizacao) params.append('localizacao', filtros.localizacao);
    if (filtros.status) params.append('status', filtros.status);
    if (filtros.codigo) params.append('codigo', filtros.codigo);
  
    return this.http.get<any[]>(`${this.apiUrl}/filtrar?${params.toString()}`, {
      headers: this.getHeaders()
    });
  }
  excluirCentroCusto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
