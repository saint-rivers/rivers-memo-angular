import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { env } from '@environments/env';
import { Memo } from '@panels/memo/memo-view/memo-view.component';

@Injectable({
  providedIn: 'root'
})
export class MemoService {
  memos$ = new BehaviorSubject<Memo[]>([]);
  size = 10;
  lastId = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  fetchMemos(size: number, last?: number) {
    if (!last) last = 0;
    const params = new HttpParams({
      fromObject: { size, last }
    });
    this.http.get(`${env.serverUrl}/api/v1/memo`, { params })
      .subscribe((res: any) => {
        this.memos$.next(res);
      });
  }

  fetchTagFilteredMemoes(size: number, tags: string[], last?: number) {
    if (!last) last = 0;
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

  putTags(id: number, added: string[], removed: string[], callback: () => void) {
    return this.http
      .put(`${env.serverUrl}/api/v1/memo/${id}/tags`, { removed, added })
      .subscribe(res => {
        callback();
        this.fetchMemos(10, this.lastId.value);
      })
  }

  insertMemo(payload: { message: string, tags: string[] }, callback: () => void) {
    this.http.post(`${env.serverUrl}/api/v1/memo`, { ...payload })
      .subscribe(() => {
        callback();
        this.fetchMemos(10, this.lastId.value);
      })
  }

  delete(id: number, callback: () => void) {
    this.http.delete(`${env.serverUrl}/api/v1/memo/${id}`).subscribe(() => {
      callback();
      this.fetchMemos(10, this.lastId.value);
    })
  }

  searchMemo(searchKey: string, size: number, lastId: number) {
    const params = new HttpParams();
    params.set('size', size.toString());
    params.set('last', lastId.toString());
    return this.http.get(`${env.serverUrl}/api/v1/memo/${searchKey}`, {
      params: new HttpParams()
        .set('size', size.toString())
        .set('last', lastId.toString())
    });
  }


  // editing memo functions
  editingMemo$ = new BehaviorSubject<Memo | null>(null);
  setEditingMemo(m: Memo | null) {
    this.editingMemo$.next(m);
  }

}
