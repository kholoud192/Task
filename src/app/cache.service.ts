import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: { [url: string]: any } = {};

  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    if (this.cache[url]) {
      return of(this.cache[url]);
    }
    return this.http.get(url).pipe(
      tap(response => {
        this.cache[url] = response;
      })
    );
  }
  clearCache(url?: string): void {
    if (url) {
      delete this.cache[url];
    } else {
      this.cache = {};
    }
  }
  
}
