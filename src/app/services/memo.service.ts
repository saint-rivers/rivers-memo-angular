import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ogs from 'open-graph-scraper';
import { Observable } from 'rxjs';

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

  fetchTags(): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:5050/tags`);
  }

  fetchLinkPreview(link: string) {
    // return this.http.get(`https://api.linkpreview.net/?q=${link}`, {
    //   headers: { 'X-Linkpreview-Api-Key': '9ba9fb9f4defc7a02302b54454c9618b' }
    // });

  }
}
