import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ogs from 'open-graph-scraper';
import { filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemoService {

  constructor(private http: HttpClient) {
  }

  fetchMemos(size: number, last?: string) {
    if (!last) last = "";
    const params = new HttpParams({
      fromObject: { size, last }
    });
    return this.http.get(`http://localhost:5050/memo`, { params });
  }

  fetchTagFilteredMemoes(size: number, tags: string[], last?: string) {
    if (!last) last = "";
    const params = new HttpParams({
      fromObject: { size, last, tag: tags }
    });
    return this.http.get(`http://localhost:5050/memo`, { params });
  }

  fetchTags(): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:5050/tags`);
  }

}
