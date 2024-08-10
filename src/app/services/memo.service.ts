import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { env } from '@environments/env';
import { Memo } from '../components/memo-view/memo-view.component';

@Injectable({
  providedIn: 'root'
})
export class MemoService {
  memos$ = new BehaviorSubject<Memo[]>([]);
  constructor(private http: HttpClient) { }

  fetchMemos(size: number, last?: string) {
    if (!last) last = "";
    const params = new HttpParams({
      fromObject: { size, last }
    });
    this.http.get(`${env.serverUrl}/api/v1/memo`, { params })
      .subscribe((res: any) => {
        this.memos$.next(res);
      });
  }

  fetchTagFilteredMemoes(size: number, tags: string[], last?: string) {
    if (!last) last = "";
    const params = new HttpParams({
      fromObject: { size, last, tag: tags }
    });
    this.http.get(`${env.serverUrl}/api/v1/memo`, { params })
      .subscribe((res: any) => {
        this.memos$.next(res);
      });
  }

  fetchTags(): Observable<string[]> {
    return this.http.get<string[]>(`${env.serverUrl}/api/v1/tags`);
  }

  appendTags(memoId: number, tags: string[]) {
    return this.http.post(`${env.serverUrl}/api/v1/memo/${memoId}/tags`, { tags });
  }

  putTags(id: number, added: string[], removed: string[]) {
    return this.http.put(`${env.serverUrl}/api/v1/memo/${id}/tags`, { removed, added })
  }
  
  insertMemo(payload: { message: string, tags: string[] }, callback: () => void) {
    this.http.post(`${env.serverUrl}/api/v1/memo`, { ...payload })
      .subscribe(() => {
        callback();
        this.fetchMemos(10, "");
      })
  }
}
