import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '@environments/env';

@Injectable({
  providedIn: 'root'
})
export class MemoService {
  putTags(id: number, added: string[], removed: string[]) {
    return this.http.put(`${env.serverUrl}/api/v1/memo/${id}/tags`, { removed, added })
  }

  constructor(private http: HttpClient) { }

  fetchMemos(size: number, last?: string) {
    if (!last) last = "";
    const params = new HttpParams({
      fromObject: { size, last }
    });
    return this.http.get(`${env.serverUrl}/api/v1/memo`, { params });
  }

  fetchTagFilteredMemoes(size: number, tags: string[], last?: string) {
    if (!last) last = "";
    const params = new HttpParams({
      fromObject: { size, last, tag: tags }
    });
    return this.http.get(`${env.serverUrl}/api/v1/memo`, { params });
  }

  fetchTags(): Observable<string[]> {
    return this.http.get<string[]>(`${env.serverUrl}/api/v1/tags`);
  }

  appendTags(memoId: number, tags: string[]) {
    return this.http.post(`${env.serverUrl}/api/v1/memo/${memoId}/tags`, { tags });
  }
}
