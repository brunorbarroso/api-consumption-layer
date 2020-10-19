import { Injectable } from '@angular/core';
import { Observable, of, throwError, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

const apiUrl = 'http://localhost:3000';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService<T> {

  selectedResource$: Observable<any>;
  private resourceSubject = new Subject<any>();
  resource: string;

  constructor(private http: HttpClient) {
    this.selectedResource$ = this.resourceSubject.asObservable();
  }

  setResource(resource: string) {
    this.resource = resource;
    this.resourceSubject.next(resource);
  }

  get(): Observable<T[]> {
    return this.http.get<T[]>(this.getPathBase())
      .pipe(
        tap(items => console.log('Get all items')),
        catchError(this.handleError('getAll', []))
      );
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.getPathBase()}/${id}`).pipe(
      tap(_ => console.log(`Get item with by id=${id}`)),
      catchError(this.handleError<T>(`getById id=${id}`))
    );
  }

  add(item: T): Observable<T> {
    return this.http.post<T>(this.getPathBase(), item, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((item: T) => console.log(`Added item`)),
      catchError(this.handleError<T>('add'))
    );
  }

  update(id: string, item: T): Observable<any> {
    return this.http.put(`${this.getPathBase()}/${id}`, item, httpOptions).pipe(
      tap(_ => console.log(`Update item with id=${id}`)),
      catchError(this.handleError<any>('update'))
    );
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.getPathBase()}/delete/${id}`, httpOptions).pipe(
      tap(_ => console.log(`Delete item with id=${id}`)),
      catchError(this.handleError<T>('delete'))
    );
  }

  private getPathBase(): string {
    return `${apiUrl}/${this.resource}`;
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
}