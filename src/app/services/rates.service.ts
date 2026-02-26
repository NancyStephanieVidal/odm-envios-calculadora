import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Destino {
  destino: string;
}

export interface Tarifa {
  id: number;
  destino: string;
  sobre: number;
  menos_1kg: number;
  cajas_1_10kg: number;
  cajas_11_20kg: number;
  cajas_21_30kg: number;
}

export interface CalculoResponse {
  precio: number;
  destino: string;
  peso: number;
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class RatesService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  testConnection(): Observable<any> {
    return this.http.get(`${this.apiUrl}/test`);
  }

  obtenerDestinos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/destinos`);
  }

  obtenerTarifas(): Observable<Tarifa[]> {
    return this.http.get<Tarifa[]>(`${this.apiUrl}/tarifas`);
  }

  calcularEnvio(datos: { destino: string, peso: number }): Observable<CalculoResponse> {
    return this.http.post<CalculoResponse>(`${this.apiUrl}/calcular`, datos);
  }
}