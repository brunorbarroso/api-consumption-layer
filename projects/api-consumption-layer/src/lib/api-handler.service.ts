import { Injectable } from '@angular/core';
import { Observable, of, throwError, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

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

  selectedUrl$: Observable<any>;
  private urlSubject = new Subject<any>();
  apiUrl: string;
  
  selectedHeader$: Observable<any>;
  header: any;
  private headerSubject = new Subject<any>();

  constructor(private http: HttpClient) {
    this.selectedResource$ = this.resourceSubject.asObservable();
    this.selectedUrl$ = this.urlSubject.asObservable();
    this.selectedHeader$ = this.headerSubject.asObservable();
    this.setHeader("{'Content-Type': 'application/json'}")
  }

  setResource(resource: string) {
    this.resource = resource;
    this.resourceSubject.next(resource);
  }

  setUrl(url: string) {
    this.apiUrl = url;
    this.urlSubject.next(url);
  }

  setHeader(header) {
    this.header = header
    this.headerSubject.next(header);
  }

  get(): Observable<T[]> {
    return this.http.get<T[]>(this.getPathBase(), {headers: this.header})
      .pipe(
        tap(items => console.log('Get all items')),
        catchError(this.handleError('getAll', []))
      );
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.getPathBase()}/${id}`, {headers: this.header}).pipe(
      tap(_ => console.log(`Get item with by id=${id}`)),
      catchError(this.handleError<T>(`getById id=${id}`))
    );
  }

  add(item: T): Observable<T> {
    return this.http.post<T>(this.getPathBase(), item, {headers: this.header}).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((item: T) => console.log(`Added item`)),
      catchError(this.handleError<T>('add'))
    );
  }

  update(id: string, item: T): Observable<any> {
    return this.http.put(`${this.getPathBase()}/${id}`, item, {headers: this.header}).pipe(
      tap(_ => console.log(`Update item with id=${id}`)),
      catchError(this.handleError<any>('update'))
    );
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.getPathBase()}/delete/${id}`, {headers: this.header}).pipe(
      tap(_ => console.log(`Delete item with id=${id}`)),
      catchError(this.handleError<T>('delete'))
    );
  }

  private getPathBase(): string {
    return `${this.apiUrl}/${this.resource}`;
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
}