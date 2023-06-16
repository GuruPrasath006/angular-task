import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Stock } from './stock';



@Injectable({ providedIn: 'root' })
export class ApiService {

  private apisUrl = 'http://localhost:3456';  // URL to web api http://localhost:3456/stocks

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
    ) { }

  /** GET stocks from the server */
  getStocks(): Observable<Stock[]> {
    const url = `${this.apisUrl}/stocks`;
    return this.http.get<Stock[]>(url)
      .pipe(
        map((response: any) => {
          if(response.status==1)
          return response.data.stocks;
        }),
        tap(_ => this.log('fetched stocks')),
        catchError(this.handleError<Stock[]>('getHeroes', []))
      );
  }

  getWatchList(): Observable<Stock[]> {
    const url = `${this.apisUrl}/watch-list`;
    return this.http.get<Stock[]>(url)
      .pipe(
        map((response: any) => {
          if(response.status==1)
          return response.data.stocks;
        }),
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Stock[]>('getHeroes', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
  }
}
