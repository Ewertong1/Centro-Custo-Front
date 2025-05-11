import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {
  private apiUrl = environment.apiUrl + '/relatorios';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
        console.warn('Token não encontrado no localStorage!');
    }
    return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || ''}`
    });
}


  obterRelatorioSintetico(idCentroCusto: number): Observable<any[]> {
    console.log(this.getHeaders());
    return this.http.get<any[]>(`${this.apiUrl}/sintetico?idCentroCusto=${idCentroCusto}`, { headers: this.getHeaders() });

    // return this.http.get<any[]>(`${this.apiUrl}/sintetico/${idCentroCusto}`, { headers: this.getHeaders() });
  }
  
  obterRelatorioAnalitico(idCentroCusto: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/analitico?idCentroCusto=${idCentroCusto}`, { headers: this.getHeaders() });
  }
  



  getTotalSuprimentos(idCentroCusto: number): Observable<any[]>  {
    return this.http.get<any[]>(`${this.apiUrl}/total-suprimentos?idCentroCusto=${idCentroCusto}`, { headers: this.getHeaders() });
  }


}
