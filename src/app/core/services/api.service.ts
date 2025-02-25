import { Inject } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { BASE_URL } from "../constants.provider";

export abstract class ApiService {
  constructor(
    protected http: HttpClient,
    @Inject(BASE_URL) protected baseUrl: string
  ) {}
  protected get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`).pipe(
      map((res) => res as T),
      catchError((res: HttpErrorResponse) => of(res.error as T))
    )
  }
  protected post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body).pipe(
      map((res) => res as T),
      catchError((res: HttpErrorResponse) => of(res.error as T))
    )
  }
}