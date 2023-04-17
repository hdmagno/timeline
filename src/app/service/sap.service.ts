import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SapService {

  events: any[] = [];

  constructor(private http: HttpClient) { }

  getStatusSap(id: number = 1) {
    return this.http.get<any>("http://localhost:3000/timeline" + "/" + id).pipe(
      map(res => res?.tracking),
      tap(console.log)
    );
  }
}
