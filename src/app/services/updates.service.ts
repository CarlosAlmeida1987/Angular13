import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Updates } from '../models/updates';


@Injectable({
  providedIn: 'root'
})
export class UpdatesService {

  url = 'http://localhost:8080/api/v1/updates'; // api rest

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os updates
  getUpdates(): Observable<Updates[]> {
    return this.httpClient.get<Updates[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um Updates pelo id
  getUpdatesById(id: string): Observable<Updates> {
    return this.httpClient.get<Updates>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // deleta um Updates
  listaUpdates(updates: Updates) {
    return this.httpClient.get<Updates>(this.url + '/' + updates.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  // salva um Updates
  saveUpdates(updates: Updates): Observable<Updates> {
    return this.httpClient.post<Updates>(this.url, JSON.stringify(updates), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um Updates
  updateUpdates(updates: Updates): Observable<Updates> {
    return this.httpClient.put<Updates>(this.url + '/' + updates.id, JSON.stringify(updates), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um Updates
  deleteUpdates(updates: Updates) {
    return this.httpClient.delete<Updates>(this.url + '/' + updates.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
