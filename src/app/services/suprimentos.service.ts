import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Torna o serviço acessível globalmente
})
export class SuprimentosService {
  private apiUrl = 'https://santaizabel.net.br/api';
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');  // Obtendo o token armazenado
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  listarUnidades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/suprimentos/unidades`, { headers: this.getHeaders() });
  }

  listarAgentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/agentes`, { headers: this.getHeaders() });
  }

  listarTiposPagamento(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tipos-pagamento`, { headers: this.getHeaders() });
  }

  listarCentrosCusto(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/centro-custo`, { headers: this.getHeaders() });
  }

  listarPlanosContaNivel1(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/planos-conta/nivel-1`, { headers: this.getHeaders() });
  }

  listarPlanosContaNivel2(nivel1: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/planos-conta/nivel-2?codigoBase=${nivel1}`, { headers: this.getHeaders() });
  }

  listarPlanosContaNivel3(nivel2: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/planos-conta/nivel-3?codigoBase=${nivel2}`, { headers: this.getHeaders() });
  }

  listarPlanosContaNivel4(nivel3: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/planos-conta/nivel-4?codigoBase=${nivel3}`, { headers: this.getHeaders() });
  }

  salvar(suprimento: any): Observable<any> {
    suprimento.tipo = suprimento.tipo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

    return this.http.post<any>(`${this.apiUrl}/suprimentos`, suprimento, { headers: this.getHeaders() });
  }

  consultarSuprimentos(filtros: { nome: string, idAgente: number, idCentroCusto: number }): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/suprimentos/consulta`, filtros, { headers: this.getHeaders() });
  }

// 🔥 Buscar por ID com o token
buscarPorId(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/suprimentos/${id}`, { headers: this.getHeaders() });
}

// 🔥 Atualizar com o token
atualizar(id: number, suprimento: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/suprimentos/${id}`, suprimento, { headers: this.getHeaders() });
}
excluir(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/suprimentos/${id}`, { headers: this.getHeaders() });
}

// 🔥 Cadastrar com o token
cadastrar(suprimento: any): Observable<any> {
  return this.http.post(this.apiUrl, suprimento, { headers: this.getHeaders() });
}
  
}
